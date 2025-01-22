"use server";

import { getEvents } from "@/data/events";
import { GetEventsSchema } from "@/schemas/events";
import * as z from "zod";

export async function fetchEventsAction(
  values: z.infer<typeof GetEventsSchema>
) {
  const validatedFields = GetEventsSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid data request" };
  }

  const results = await getEvents(validatedFields.data);

  return results;
}
