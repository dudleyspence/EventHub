import { auth } from "@/auth";
// this can be used to get the current user and use in server components

export interface currentUser {
  id: string | undefined | null;
  name: string | undefined | null;
  email: string | undefined | null;
  role: string | undefined | null;
}

export async function currentUser() {
  const session = await auth();

  if (!session) {
    return undefined;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  };
}

export async function currentRole() {
  const session = await auth();

  return session?.user?.role;
}
