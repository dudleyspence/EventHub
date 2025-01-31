import { CreateEventInput } from "@/types/event";
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

export async function postEvent(event: CreateEventInput, user_id: string) {
  const userEvent = { ...event, userId: user_id };
  const newEvent = await db.event.create({
    data: userEvent,
  });
  return newEvent;
}
