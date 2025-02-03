import * as z from "zod";

export const FetchEventsSchema = z.object({
  orderBy: z.enum(["date", "totalAttendees"]).default("date"),
  sort: z.enum(["asc", "desc"]).default("asc"),
  category: z.string().optional(),
  startDate: z
    .date()
    .optional()
    .default(() => {
      const today = new Date();
      return today;
    }),
  endDate: z.date().optional(),
  page: z.number().int().gt(0).default(1),
  limit: z.number().int().gt(0).default(10),
});
