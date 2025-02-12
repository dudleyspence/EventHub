// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

import { UserRole } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generateUsers } from "@/seed/generateUsers";
import { generateEvents } from "@/seed/generateEvents";
import * as dotenv from "dotenv";
import { generateCategories } from "./generateCategories";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const envFile =
  process.env.NODE_ENV === "test" ? ".env.test" : ".env.development";
dotenv.config({ path: envFile });

export async function seed() {
  // before seeding clear database

  clearDatabase();

  let hashedPassword;

  if (process.env.ADMINPASSWORD) {
    hashedPassword = await bcrypt.hash(process.env.ADMINPASSWORD, 10);
  } else {
    console.log("No admin password found");
  }

  const seedAdmin = {
    id: "test_id",
    email: process.env.ADMINEMAIL as string,
    name: "ADMIN USER",
    image: faker.image.avatar(),
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  await db.user.create({ data: seedAdmin });

  const UserData = await generateUsers(15);

  await db.user.createMany({ data: UserData });
  const admin = await db.user.findUnique({
    where: { email: process.env.ADMINEMAIL as string },
  });
  if (!admin) throw new Error("Admin user not found");

  const categories = generateCategories();
  await db.category.createMany({ data: categories, skipDuplicates: true });
  const allCategories = (await db.category.findMany()).map(
    (category) => category.name
  );

  const EventsData = await generateEvents(admin.id, allCategories, 50);

  // logically there shouldnt be duplicates possible but its there just incase
  await db.event.createMany({
    data: EventsData,
    skipDuplicates: true,
  });

  const allUsers = await db.user.findMany({
    where: { id: { not: "test_id" } },
  });
  const allEvents = await db.event.findMany();

  const popular_events = await db.event.findMany({
    where: { id: { in: ["popular_id_1", "popular_id_2"] } },
  });

  // uses map to register each user to 5 random events

  // flattens the result into a single array of eventAttendees
  const eventAttendeesData = allUsers.flatMap((user) => {
    const attendedEvents = faker.helpers.shuffle(allEvents).slice(0, 10);
    attendedEvents.push(...popular_events);
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

  const updatePromises = eventsWithAttendees.map((event) =>
    db.event.update({
      where: { id: event.id },
      data: { totalAttendees: event.attendees.length },
    })
  );

  await Promise.all(updatePromises);
}

export async function clearDatabase() {
  await db.eventAttendee.deleteMany();
  await db.event.deleteMany();
  await db.user.deleteMany();
  await db.account.deleteMany();
  await db.category.deleteMany();
}
