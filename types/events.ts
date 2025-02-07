import { FetchEventsSchema } from "@/schemas/events";
import { Event } from "@prisma/client";
import { z } from "zod";

export type FetchEventsInput = z.infer<typeof FetchEventsSchema>;

export interface FetchEventsOutput {
  events: Event[];
  total: number;
  totalPages: number;
}

export interface eventsFilters {
  category?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  orderBy?: "date" | "totalAttendees";
  sort?: "asc" | "desc";
}
