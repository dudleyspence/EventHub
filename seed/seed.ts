// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import { PrismaClient, UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generateUsers } from "@/seed/generateUsers";
import { generateEvents } from "@/seed/generateEvents";

const db = new PrismaClient();

async function seed() {
  // before seeding clear database
  await db.eventAttendee.deleteMany();
  await db.event.deleteMany();
  await db.user.deleteMany();

  const seedAdmin = {
    email: process.env.ADMINEMAIL as string,
    name: "ADMIN USER",
    image: faker.image.avatar(),
    password: process.env.ADMINPASSWORD as string,
    role: UserRole.ADMIN,
  };

  const UserData = generateUsers();

  UserData.push(seedAdmin);

  await db.user.createMany({ data: UserData });

  const admin = await db.user.findUnique({
    where: { email: "admin@admin.com" },
  });
  if (!admin) throw new Error("Admin user not found");

  const EventsData = generateEvents(admin.id);

  // logically there shouldnt be duplicates possible but its there just incase
  await db.event.createMany({
    data: EventsData,
    skipDuplicates: true,
  });

  const allUsers = await db.user.findMany();
  const allEvents = await db.event.findMany();

  // uses map to register each user to 5 random events

  // flattens the result into a single array of eventAttendees
  const eventAttendeesData = allUsers.flatMap((user) => {
    const attendedEvents = faker.helpers.shuffle(allEvents).slice(0, 5);
    return attendedEvents.map((event) => ({
      eventId: event.id,
      userId: user.id,
    }));
  });

  // logically there shouldnt be duplicates possible but its there just incase
  await db.eventAttendee.createMany({
    data: eventAttendeesData,
    skipDuplicates: true,
  });

  // finds all events that have 1 or more attendee
  const eventsWithAttendees = await db.event.findMany({
    include: { attendees: true },
  });

  //   eventsWithAttendees.forEach(
  //     async (event) =>
  //       await db.event.update({
  //         where: { id: event.id },
  //         data: { totalAttendees: event.attendees.length },
  //       })
  //   );

  const updatePromises = eventsWithAttendees.map((event) =>
    db.event.update({
      where: { id: event.id },
      data: { totalAttendees: event.attendees.length },
    })
  );

  await Promise.all(updatePromises);
}

seed()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
