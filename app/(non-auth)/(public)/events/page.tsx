import EventsListContainer from "@/components/eventslist/EventsListContainer";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <div className="pt-10 w-full">
      <div className="w-full bg-yellow-100 h-[250px] mb-5">
        <h1 className="w-full text-left p-10 font-bold text-5xl mb-10">
          Browse Events
        </h1>
      </div>
      <EventsListContainer />;
    </div>
  );
}
