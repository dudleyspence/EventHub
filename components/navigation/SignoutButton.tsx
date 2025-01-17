"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignoutButton() {
  return (
    <Button onPress={() => signOut({ redirectTo: "/signin" })}>Sign Out</Button>
  );
}
