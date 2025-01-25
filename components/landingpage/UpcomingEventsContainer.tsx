import { fetchEventsAction } from "@/actions/fetchEvents";
import React from "react";
import UpcomingEvents from "./UpcomingEvents";

export default async function UpcomingEventsContainer() {
  const events = await fetchEventsAction({});

  if (!Array.isArray(events)) {
    return null;
  }

  return (
    <div className="bg-amber-200 rounded-xl">
      <h1 className="mt-5 ml-5 font-bold text-3xl">Upcoming Events</h1>
      <UpcomingEvents events={events} />
    </div>
  );
}
