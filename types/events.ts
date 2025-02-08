import { FetchEventsSchema } from "@/schemas/events";
import { z } from "zod";

export type FetchEventsInput = z.infer<typeof FetchEventsSchema>;

export interface EventListEvent {
  id: string;
  title: string;
  date: Date;
  maxCapacity: number | null;
  totalAttendees: number;
  image: string;
  category: string;
}

export interface FetchEventsOutput {
  events: EventListEvent[];
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
