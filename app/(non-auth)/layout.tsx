import React from "react";
import DynamicNavbar from "@/components/navigation/DynamicNavbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/auth/LoginModel";

export default async function NonAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen max-w-[1280px] justify-items-center min-h-screen">
      <DynamicNavbar />
      <LoginModal />
      {children}
      <Footer />
    </div>
  );
}
