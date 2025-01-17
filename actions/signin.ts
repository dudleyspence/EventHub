"use server";

import * as z from "zod";

import { SigninSchema } from "@/schemas";

export async function signin(values: z.infer<typeof SigninSchema>) {
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong please try again" };
  }

  return { success: "Successfully signed in" };
}
