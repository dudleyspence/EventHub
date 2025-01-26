import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "EventHub",
  description: "EventHub platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
