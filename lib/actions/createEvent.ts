"use server";
import { CreateEventSchema } from "@/schemas/event";
import { CreateEventInput } from "@/types/event";
import { fetchCategories } from "./fetchCategories";
import { postEvent } from "../event";
import { getUserById } from "../user";

export async function createEventAction(
  event: CreateEventInput,
  user_id: string
) {
  const parsedEvent = CreateEventSchema.safeParse(event);

  if (!parsedEvent.success) {
    throw new Error("Invalid event data");
  }

  const categories = await fetchCategories();

  const categoryNames = categories.map((category) => category.name);

  // this may cause an error, maybe need to map categories to be a list of names first
  if (!categoryNames.includes(parsedEvent.data.category)) {
    throw new Error("Invalid category");
  }

  const user = await getUserById(user_id);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role !== "ADMIN") {
    throw new Error("You do not have permission to create events");
  }

  return await postEvent(parsedEvent.data, user_id);
}
