"use server";

import { getUserEvents } from "@/lib/events";
import { Event } from "@prisma/client";

export async function fetchUserEvents(
  user_id: string,
  history = false
): Promise<Event[]> {
  const results = await getUserEvents(user_id, history);

  return results;
}
