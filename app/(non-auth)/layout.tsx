import React from "react";
import DynamicNavbar from "@/components/navigation/DynamicNavbar";
import Footer from "@/components/Footer";

export default function NonAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen max-w-[1280px] justify-items-center min-h-screen">
      <DynamicNavbar />
      {children}
      <Footer />
    </div>
  );
}
