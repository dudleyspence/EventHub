"use server";

import { getEvent } from "@/data/event";

export async function fetchSingleEvent(event_id: string) {
  const event = await getEvent(event_id);

  if (!event) {
    throw new Error("Event not found");
  }
  return event;
}
