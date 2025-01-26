"use client";
import React from "react";
import { Event } from "@prisma/client";
import Link from "next/link";
import EventCard from "./EventCard";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="w-full flex flex-row gap-5 flex-wrap justify-center">
      {events.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <EventCard
            name={event.title}
            date={event.date}
            maxCapacity={event.maxCapacity}
            totalAttendees={event.totalAttendees}
            image={event.image}
            category={event.category}
          />
        </Link>
      ))}
    </div>
  );
}
