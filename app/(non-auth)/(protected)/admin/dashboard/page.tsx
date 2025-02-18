import AdminDashboardTabs from "@/components/admin/dashboard/AdminDashboardTabs";
import { currentUser } from "@/lib/auth";
import React from "react";

export default async function page() {
  const user = await currentUser();

  return (
    <div className="flex w-full min-h-[70vh] gap-10 flex-col pt-10">
      <div className="mt-10 ml-6 mb-5">
        <h1 className="font-bold text-4xl w-full text-left mb-3">
          Admin Dashboard
        </h1>
        <h2 className="text-xl font-bold w-full text-left">
          Welcome back, {user.name}!
        </h2>
      </div>
      <AdminDashboardTabs />
    </div>
  );
}
