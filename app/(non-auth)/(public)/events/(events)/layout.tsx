import React from "react";

export default async function EventsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-full">{children}</div>;
}
