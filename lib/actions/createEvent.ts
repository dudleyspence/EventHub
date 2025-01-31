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

// export const CreateEventSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Event names must be at least 3 characters")
//     .max(100, "Event names must be less than 100 characters")
//     .nonempty("Please enter a name for this event"),
//   description: z
//     .string()
//     .min(10, "description must be at least 10 characters")
//     .max(1000, "description must not exceed 1000 characters")
//     .nonempty("Please provide a description for this event"),
//   maxCapacity: z
//     .number()
//     .int("This number is invalid")
//     .min(1, "The max capacity of an event must be at least 1")
//     .optional(),
//   image: z.string().url("An image is required"),
//   date: z.date(),
//   category: z.string(),
// });
