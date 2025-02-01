import * as z from "zod";

export const CreateEventSchema = z.object({
  title: z
    .string()
    .min(3, "Event names must be at least 3 characters")
    .max(100, "Event names must be less than 100 characters")
    .nonempty("Please enter a name for this event"),
  description: z
    .string()
    .min(10, "description must be at least 10 characters")
    .max(1000, "description must not exceed 1000 characters")
    .nonempty("Please provide a description for this event"),
  maxCapacity: z
    .number()
    .int("This number is invalid")
    .min(1, "The max capacity of an event must be at least 1")
    .optional(),
  image: z.string().url("An image is required"),
  date: z.date().min(new Date()),
  category: z.string(),
});
