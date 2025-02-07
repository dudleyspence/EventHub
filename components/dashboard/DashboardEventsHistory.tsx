import React from "react";
import EventsHistoryHeader from "@/public/graphics/YOUR_EVENTS_HISTORY.png";
import Image from "next/image";
import EventsReel from "../EventsReel";
import { fetchUserEvents } from "@/lib/actions/fetchUserEvents";

export default async function DashboardEventsHistory({
  user_id,
}: {
  user_id: string;
}) {
  const events = await fetchUserEvents(user_id, true);

  return (
    <div className="bg-orange-300 xl:rounded-xl mt-6">
      <div className="relative">
        <Image
          height={80}
          alt="Upcoming Events Header"
          src={EventsHistoryHeader}
          className="absolute -top-14 left-10 "
        />
      </div>

      {events && events.length > 0 ? (
        <EventsReel events={events} centeredSlides={false} />
      ) : (
        <div className="w-screen max-w-[1280px] min-h-[400px] flex justify-center items-center mt-8 py-8">
          <p className="text-xl font-bold">
            You have not attended any events yet
          </p>
        </div>
      )}
    </div>
  );
}
