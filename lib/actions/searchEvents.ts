"use server";

import { eventSearch } from "../events";

export async function searchEvents(searchTerm: string) {
  if (!searchTerm) return [];

  const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, " ");

  const events = await eventSearch(sanitizedSearchTerm.trim());

  return events;
}
