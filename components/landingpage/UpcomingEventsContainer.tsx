import { fetchEventsAction } from "@/actions/fetchEvents";
import React from "react";
import UpcomingEvents from "./UpcomingEvents";

export default async function UpcomingEventsContainer() {
  const events = await fetchEventsAction({});

  if (!Array.isArray(events)) {
    return null;
  }

  return <UpcomingEvents events={events} />;
}
