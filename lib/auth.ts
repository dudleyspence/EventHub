import { auth } from "@/auth";
// this can be used to get the current user and use in server components

export async function currentUser() {
  const session = await auth();

  const user = { ...session?.user };
  delete user.googleRefreshToken;
  delete user.googleToken;
  delete user.googleTokenExpiresAt;

  return user;
}

export async function currentRole() {
  const session = await auth();

  return session?.user?.role;
}
