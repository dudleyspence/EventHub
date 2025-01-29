"use server";

import { getEvent } from "@/data/event";

export async function attendEvent(user_id: string, event_id: string) {
  const eventExists = await getEvent(event_id);
  if (!eventExists) {
    throw new Error("Event not found");
  }

  // CHECKS
  // if user_id and event_id are valid
  // if user is not already attending the event
  // if event is not full

  // UPDATE EVENT
  // UPDATE USER

  // return success or failure message
}
