"use server";

import { getEvents } from "@/data/events";
import { FetchEventsSchema } from "@/schemas/events";
import { Event } from "@prisma/client";

// using values: unknown as we could pass values={} which would be
// accepted by the schema and parsed to include the default values

export type FetchEventsOutputType = Event[] | { error: string };

export async function fetchEventsAction(
  values: unknown
): Promise<FetchEventsOutputType> {
  const validatedFields = FetchEventsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data request" };
  }

  const results = await getEvents(validatedFields.data);

  return results;
}
