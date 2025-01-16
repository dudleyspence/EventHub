"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

import { SignupSchema } from "@/schemas";

export async function signup(values: z.infer<typeof SignupSchema>) {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong please try again" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "This email address is already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Learn to setup verification token email

  return { success: "Successfully registered" };
}
