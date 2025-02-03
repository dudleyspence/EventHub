import { fetchEventsAction } from "@/lib/actions/fetchEvents";
import React from "react";
import UpcomingEventsHeader from "@/public/graphics/UPCOMING_EVENTS.png";
import Image from "next/image";
import EventsReel from "../EventsReel";

export default async function UpcomingEventsContainer() {
  const eventsObj = await fetchEventsAction({});

  if (!Array.isArray(eventsObj.events) || eventsObj.events.length === 0) {
    return null;
  }

  return (
    <div className="bg-orange-300 rounded-xl mt-6">
      <div className="relative">
        <Image
          height={80}
          alt="Upcoming Events Header"
          src={UpcomingEventsHeader}
          className="absolute -top-10 left-10 "
        />
      </div>
      <EventsReel events={eventsObj.events} centeredSlides={true} />
    </div>
  );
}
