import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <Providers>
          <SpeedInsights />
          {children}
        </Providers>
      </body>
    </html>
  );
}
