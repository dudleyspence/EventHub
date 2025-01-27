import EventsListContainer from "@/components/eventslist/EventsListContainer";
import React from "react";

export default function page() {
  return (
    <div className="pt-10 w-full">
      <h1 className="w-full text-center font-bold text-5xl mb-10">
        Browse Events
      </h1>
      <EventsListContainer />;
    </div>
  );
}
