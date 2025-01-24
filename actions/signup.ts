"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

import { SignupSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import { SignupInput } from "@/types/auth";

export async function signup(values: SignupInput) {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong please try again" };
  }

  const { email, password, name } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

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

  return { success: "Signup Complete" };
}
