import * as z from "zod";
import { EventCategories } from "@prisma/client";

export const FetchEventsSchema = z.object({
  orderBy: z.enum(["date", "maxCapacity"]).default("date"),
  sort: z.enum(["asc", "desc"]).default("desc"),
  category: z.nativeEnum(EventCategories).optional(),
  startDate: z
    .date()
    .optional()
    .default(() => {
      const todayAtMidnight = new Date();
      todayAtMidnight.setHours(0, 0, 0, 0);
      return todayAtMidnight;
    }),
  endDate: z.date().optional(),
  page: z.number().int().gt(0).optional().default(1),
  limit: z.number().int().gt(0).optional().default(10),
});
