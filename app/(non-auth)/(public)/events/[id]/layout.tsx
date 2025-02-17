import { AlertContextProvider } from "@/context/AlertContext";
import React from "react";

export default async function SingleEventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlertContextProvider>{children}</AlertContextProvider>;
}
