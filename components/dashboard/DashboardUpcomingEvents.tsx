import React from "react";
import UpcomingEventsHeader from "@/public/graphics/YOUR_UPCOMING_EVENTS.png";
import Image from "next/image";
import EventsReel from "../EventsReel";
import { fetchUserEvents } from "@/lib/actions/fetchUserEvents";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

export default async function DashboardUpcomingEvents({
  user_id,
}: {
  user_id: string;
}) {
  const events = await fetchUserEvents(user_id, false);

  return (
    <div className="bg-orange-300 xl:rounded-xl mt-6">
      <div className="relative">
        <Image
          height={100}
          alt="Upcoming Events Header"
          src={UpcomingEventsHeader}
          className="absolute -top-14 left-10 "
        />
      </div>

      {events && events.length > 0 ? (
        <EventsReel events={events} centeredSlides={false} />
      ) : (
        <div className="w-screen max-w-[1280px] mt-8 p-4 py-6">
          <Link href="/events/category/all">
            <div className="w-[350px] h-[400px] rounded-lg bg-gray-200 flex flex-col gap-5 p-10 text-center justify-center items-center cursor-pointer shadow-lg hover:scale-[1.02]">
              <p className="text-lg">You do not have any upcoming events</p>
              <FaPlus size={100} color="gray" />
              <p>Click to browse for new events</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
