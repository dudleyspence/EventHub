import React from "react";
import EventCard from "../EventCard";
import { EventListEvent } from "@/types/events";
import dynamic from "next/dynamic";
import EventCardSkeleton from "../loading/EventCardSkeleton";

const LazyEventCard = dynamic(() => import("../EventCard"), {
  ssr: true,
  loading: () => <EventCardSkeleton />,
});

interface EventListProps {
  events: EventListEvent[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className="w-full grid sm:grid-cols-2 place-items-center gap-5 mt-8 px-5">
      {events.map((event, index) =>
        index < 2 ? (
          <EventCard
            key={"event_" + event.id}
            id={event.id}
            isPriority={true}
            name={event.title}
            date={event.date}
            totalAttendees={event.totalAttendees}
            image={event.image}
            category={event.category}
          />
        ) : (
          <LazyEventCard
            key={event.id + "_LazyEventCard"}
            id={event.id}
            name={event.title}
            date={event.date}
            totalAttendees={event.totalAttendees}
            image={event.image}
            category={event.category}
          />
        )
      )}
    </div>
  );
}
