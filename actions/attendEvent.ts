"use server";

import { getEvent } from "@/data/event";
import { getUserById } from "@/data/user";

export async function attendEvent(user_id: string, event_id: string) {
  const eventExists = await getEvent(event_id);
  if (!eventExists) {
    throw new Error("Event not found");
  }

  const userExists = await getUserById(user_id);
  if (!userExists) {
    throw new Error("User not found");
  }

  const alreadyAttending = await 
  if 

  // CHECKS
  // if user_id and event_id are valid
  // if user is not already attending the event
  // if event is not full

  // UPDATE EVENT
  // UPDATE USER

  // return success or failure message
}
