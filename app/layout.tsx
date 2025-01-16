import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { db } from "@/lib/db";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
