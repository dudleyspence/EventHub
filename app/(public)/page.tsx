import { auth } from "@/auth";
import PublicNavbar from "@/components/navigation/PublicNavbar";
import SignoutButton from "@/components/navigation/SignoutButton";
import { signOut } from "next-auth/react";
import React from "react";

export default async function LandingPage() {
  const session = await auth();
  return (
    <main className="h-dvh w-full">
      <PublicNavbar />
    </main>
  );
}
