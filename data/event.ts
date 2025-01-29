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
