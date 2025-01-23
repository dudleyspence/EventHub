"use server";

import { getUpcomingEvents } from "@/data/events";

export async function fetchUpcomingEvents() {
  const results = await getUpcomingEvents();
  return results;
}
