import React from "react";
import dashboardHeader from "@/public/graphics/dashboard.png";
import Image from "next/image";
import { currentUser } from "@/lib/auth";
import DashboardUpcomingEvents from "@/components/dashboard/DashboardUpcomingEvents";
import DashboardEventsHistory from "@/components/dashboard/DashboardEventsHistory";

export default async function page() {
  const user = await currentUser();

  if (!user || !user.id) return null;

  return (
    <div className="flex flex-col items-center gap-20 py-10">
      <Image height={80} src={dashboardHeader} alt="Dashboard header" />
      <DashboardUpcomingEvents user_id={user.id} />
      <DashboardEventsHistory user_id={user.id} />
    </div>
  );
}
