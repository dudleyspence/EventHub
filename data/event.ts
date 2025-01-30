import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function getEvent(event_id: string) {
  const event = await db.event.findUnique({
    where: {
      id: event_id,
    },
  });

  return event;
}

export async function deleteEvent(event_id: string) {
  return await db.event.delete({
    where: {
      id: event_id,
    },
  });
}
