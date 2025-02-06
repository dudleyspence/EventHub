"use client";
import React from "react";
import { Event } from "@prisma/client";
import EventCard from "../EventCard";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
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
