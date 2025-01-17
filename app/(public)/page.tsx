import { auth } from "@/auth";
import SignoutButton from "@/components/navigation/SignoutButton";
import { signOut } from "next-auth/react";
import React from "react";

export default async function LandingPage() {
  const session = await auth();
  return (
    <div>
      <p>LandingPage</p>
      {JSON.stringify(session)}
      <SignoutButton />
    </div>
  );
}
