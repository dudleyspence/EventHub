"use server";

import { getUserEvents } from "@/lib/events";
import { EventListEvent } from "@/types/events";

export async function fetchUserEvents(
  user_id: string,
  history = false
): Promise<EventListEvent[]> {
  const results = await getUserEvents(user_id, history);

  return results;
}
