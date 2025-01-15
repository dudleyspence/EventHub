"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div>
      <p>Homepage</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
