import { CreateEventSchema } from "@/schemas/event";
import { z } from "zod";

export type CreateEventInput = z.infer<typeof CreateEventSchema>;
