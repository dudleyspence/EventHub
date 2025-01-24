import { fetchEventsAction } from "@/actions/fetchEvents";
import React from "react";
import UpcomingEvents from "./UpcomingEvents";

export default async function UpcomingEventsContainer() {
  const events = await fetchEventsAction({});
  console.log(events);

  if (!Array.isArray(events)) {
    return null;
  }

  return (
    <div className="w-full max-w-[1200px] flex justify-center ">
      <UpcomingEvents events={events} />;
    </div>
  );
}
