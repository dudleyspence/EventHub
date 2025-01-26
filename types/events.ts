import { FetchEventsSchema } from "@/schemas/events";
import { Event } from "@prisma/client";
import { z } from "zod";

export type FetchEventsInput = z.infer<typeof FetchEventsSchema>;

export type FetchEventsOutput = Event[];
