"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { LoginModalProvider } from "@/context/LoginModelProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LoginModalProvider>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>{" "}
      </SessionProvider>
    </LoginModalProvider>
  );
}
