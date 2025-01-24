import React from "react";
import DynamicNavbar from "@/components/navigation/DynamicNavbar";

export default function NonAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="justify-items-center min-h-screen">
      <DynamicNavbar />
      {children}
    </div>
  );
}
