"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { LoginModalProvider } from "@/context/LoginModelProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <LoginModalProvider>
        <SessionProvider>
          <NextUIProvider>{children}</NextUIProvider>{" "}
        </SessionProvider>
      </LoginModalProvider>
    </LocalizationProvider>
  );
}
