"use server";
import { auth } from "@/auth";

export async function googleAccessCheck() {
  // checking session on server for seurity

  const session = await auth();

  const googleToken = session?.user?.googleToken;

  return !!googleToken;
}
