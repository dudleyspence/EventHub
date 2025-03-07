import { CreateEventInput } from "@/types/event";
import { db } from "./db";

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

export async function updateEvent(event: CreateEventInput, event_id: string) {
  const newEvent = await db.event.update({
    where: {
      id: event_id,
    },
    data: event,
  });
  return newEvent;
}
