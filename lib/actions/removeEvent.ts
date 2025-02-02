"use server";

import { getUserById } from "@/lib/user";
import { fetchSingleEvent } from "./fetchSingleEvent";
import { deleteEvent } from "@/lib/event";

export async function removeEvent(user_id: string, event_id: string) {
  const user = await getUserById(user_id);
  const event = await fetchSingleEvent(event_id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "ADMIN") {
    throw new Error("You do not have permission to delete events");
  }

  if (!event) {
    throw new Error("Event not found");
  }

  // delete event
  return await deleteEvent(event_id);
}
