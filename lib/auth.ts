import { auth } from "@/auth";
// this can be used to get the current user and use in server components

export async function currentUser() {
  const session = await auth();

  return session?.user;
}

export async function currentRole() {
  const session = await auth();

  return session?.user?.role;
}
