import { db } from "./db";

export async function findEventAttendance(user_id: string, event_id: string) {
  const attendance = await db.eventAttendee.findFirst({
    where: {
      userId: user_id,
      eventId: event_id,
    },
  });
  console.log(attendance);
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

export async function deleteUserEventAttendance(
  user_id: string,
  event_id: string
) {
  const eventAttendence = await db.eventAttendee.findFirst({
    where: { userId: user_id, eventId: event_id },
  });

  if (!eventAttendence) {
    throw new Error("User is not attending the event");
  }

  return db.$transaction([
    db.eventAttendee.delete({
      where: { id: eventAttendence?.id },
    }),

    db.event.update({
      where: { id: event_id },
      data: { totalAttendees: { decrement: 1 } },
    }),
  ]);
}
