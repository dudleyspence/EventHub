import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export async function getEventAttendance(event_id: string, user_id: string) {
  const attendance = await db.eventAttendee.findFirst({
    where: {
      userId: user_id,
      eventId: event_id,
    },
  });
  return attendance;
}

export async function createUserEventAttendance(
  user_id: string,
  event_id: string
) {
  // using a transaction to ensure that the tables stay in sync
  // also provents errors if 2 users join event at same time
  return db.$transaction([
    db.eventAttendee.create({
      data: {
        userId: user_id,
        eventId: event_id,
      },
    }),

    db.event.update({
      where: { id: event_id },
      data: { totalAttendees: { increment: 1 } },
    }),
  ]);
}
