import React, { useEffect, useState } from "react";
import UpcomingEventsHeader from "@/public/graphics/YOUR_UPCOMING_EVENTS.png";
import Image from "next/image";
import { fetchUserEvents } from "@/lib/actions/fetchUserEvents";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import EventsReel from "@/components/EventsReel";
import { EventListEvent } from "@/types/events";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function PlannedEvents() {
  const [events, setEvents] = useState<EventListEvent[]>([]);
  const user = useCurrentUser();

  useEffect(() => {
    async function getEvents() {
      if (!user || !user.id) return null;
      const events = await fetchUserEvents(user.id, false);
      setEvents(events);
    }
    getEvents();
  }, [user]);

  return (
    <div className="bg-orange-300 xl:rounded-xl mt-6 w-screen max-w-[1040px]">
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
        <div className="w-full mt-8 p-4 py-6 pt-10">
          <Link href="/admin/events/create">
            <div className="w-[300px] h-[350px] rounded-lg bg-gray-200 flex flex-col gap-5 p-10 text-center justify-center items-center cursor-pointer shadow-lg hover:scale-[1.02]">
              <p className="text-lg">
                You have not created any events recently
              </p>
              <FaPlus size={100} color="gray" />
              <p>Click to create a new event</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
