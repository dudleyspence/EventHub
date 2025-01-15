"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      <p>Homepage</p>
      <button onClick={() => signOut({ redirectTo: "/signin" })}>
        Sign Out
      </button>
    </div>
  );
}
