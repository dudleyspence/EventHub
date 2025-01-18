import AdminNavbar from "@/components/navigation/AdminNavbar";
import PublicNavbar from "@/components/navigation/PublicNavbar";
import UserNavbar from "@/components/navigation/UserNavbar";
import { currentRole } from "@/lib/auth";
import React from "react";

export default async function DynamicNavbar() {
  const role = await currentRole();

  if (!role) return <PublicNavbar />;
  if (role === "USER") return <UserNavbar />;
  if (role === "ADMIN") return <AdminNavbar />;

  return null;
}
