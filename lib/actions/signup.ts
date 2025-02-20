"use server";
import bcrypt from "bcryptjs";

import { SignupSchema } from "@/schemas/auth";
import { createUser, getUserByEmail } from "@/lib/user";
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

  try {
    await createUser(email, hashedPassword, name);
    return { success: "Signup Complete" };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong while trying to signup" };
  }
}
