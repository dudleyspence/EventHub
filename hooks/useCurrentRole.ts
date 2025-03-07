"use client";
// get the user on the client side
import { useSession } from "next-auth/react";

export function useCurrentRole() {
  const session = useSession();

  return session.data?.user?.role;
}
