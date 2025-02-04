"use server";

import { eventSearch } from "../events";

export async function searchEvents(searchTerm: string) {
  if (!searchTerm) return [];

  const events = await eventSearch(searchTerm);

  return events;
}
