"use server";

import * as z from "zod";

import { SigninSchema } from "@/schemas/auth";
import { signIn } from "@/auth";

import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { SigninInput } from "@/types/auth";

export async function signin(values: SigninInput) {
  const validatedFields = SigninSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Something went wrong please try again" };
  }
  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: "Email not registered" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_SIGNIN_REDIRECT,
    });
    return { success: "Signed In!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
