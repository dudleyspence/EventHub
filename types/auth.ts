import { SigninSchema, SignupSchema } from "@/schemas/auth";
import { z } from "zod";

export type SigninInput = z.infer<typeof SigninSchema>;

export type SignupInput = z.infer<typeof SignupSchema>;
