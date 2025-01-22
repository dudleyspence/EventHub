import * as z from "zod";

export const GetEventsSchema = z.object({
  orderBy: z.enum(["date", "maxCapacity"]).default("date"),
  sort: z.enum(["asc", "desc"]),
  category: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  page: z.number().int().optional().default(1),
  limit: z.number().int().optional().default(10),
});
