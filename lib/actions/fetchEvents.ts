"use server";

import { getEvents } from "@/lib/events";
import { FetchEventsSchema } from "@/schemas/events";
import { FetchEventsInput, FetchEventsOutput } from "@/types/events";

// using partial as there are fields that are require but may be missing as the default values will be used when safeParsing
export async function fetchEventsAction(
  values: Partial<FetchEventsInput>
): Promise<FetchEventsOutput> {
  const validatedFields = FetchEventsSchema.safeParse(values);

  if (!validatedFields.success) {
    throw new Error("Invalid data request");
  }

  const results = await getEvents(validatedFields.data);

  return results;
}
