import { fetchEventsAction } from "@/actions/fetchEvents";
import React from "react";
import EventList from "./EventsList";

export default async function EventsListContainer() {
  const events = await fetchEventsAction({});
  return (
    <div>
      <EventList events={events} />
    </div>
  );
}
