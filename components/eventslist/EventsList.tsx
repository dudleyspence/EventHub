"use client";
import React from "react";
import EventCard from "../EventCard";
import { EventListEvent } from "@/types/events";
import Image from "next/image";

interface EventListProps {
  events: EventListEvent[];
}

export default function EventList({ events }: EventListProps) {
  if (!events.length)
    return (
      <div className="w-full pt-[150px] flex justify-center items-center">
        <div className="relative h-[300px] w-[300px]">
          <Image
            fill
            src="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739050220/NoEventsFound_xy95mm.png"
            alt="no events found graphic"
          />
        </div>
      </div>
    );

  return (
    <div className="w-full grid sm:grid-cols-2 place-items-center gap-5 mt-8 px-5">
      {events.map((event) => (
        <EventCard
          key={event.id}
          id={event.id}
          name={event.title}
          date={event.date}
          totalAttendees={event.totalAttendees}
          image={event.image}
          category={event.category}
        />
      ))}
    </div>
  );
}
