import * as z from "zod";

export const FetchEventsSchema = z.object({
  orderBy: z.enum(["date", "totalAttendees"]).default("date"),
  sort: z.enum(["asc", "desc"]).default("asc"),
  category: z.string().optional(),
  startDate: z
    .date()
    .optional()
    .default(() => {
      const todayAtMidnight = new Date();
      todayAtMidnight.setHours(0, 0, 0, 0);
      return todayAtMidnight;
    }),
  endDate: z.date().optional(),
  page: z.number().int().gt(0).default(1),
  limit: z.number().int().gt(0).default(10),
});

export const CreateEventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  maxCapacity: z.number().int().min(1).optional(),
  image: z.string().url(),
  date: z.date(),
  category: z.string(),
});
