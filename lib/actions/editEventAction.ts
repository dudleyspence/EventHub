"use server";
import { CreateEventSchema } from "@/schemas/event";
import { CreateEventInput } from "@/types/event";
import { fetchCategory } from "./fetchCategory";
import { getEvent, updateEvent } from "../event";
import { currentRole } from "../auth";

export async function editEventAction(
  event: CreateEventInput,
  event_id: string
) {
  const parsedEvent = CreateEventSchema.safeParse(event);

  if (!parsedEvent.success) {
    throw new Error("Invalid event data");
  }

  const category = await fetchCategory(parsedEvent.data.category);

  // this may cause an error, maybe need to map categories to be a list of names first
  if (!category) {
    throw new Error("Invalid category");
  }

  const confirmedEvent = await getEvent(event_id);

  if (!confirmedEvent) {
    throw new Error("Event not found");
  }

  const userRole = await currentRole();

  if (userRole !== "ADMIN") {
    throw new Error("You do not have permission to create events");
  }

  return await updateEvent(parsedEvent.data, event_id);
}
