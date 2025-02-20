"use client";
import React from "react";
import EventList from "./EventsList";
import { Pagination } from "@nextui-org/react";
import noEventsFound from "@/public/graphics/NoEventsFound.png";

import { useEventListFilters } from "@/hooks/useEventListFilters";
import Image from "next/image";
import LoadingList from "../loading/LoadingList";

interface EventListProps {
  category?: string | undefined;
}

export default function EventsListContainer({ category }: EventListProps) {
  const { isLoading, error, events, totalPages, page, handleFilterChange } =
    useEventListFilters(category);

  if (error) {
    return (
      <div className="w-full text-center">
        <h1>There seems to have been a problem</h1>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-20">
      {isLoading ? (
        <LoadingList eventsPerPage={10} />
      ) : events.length === 0 ? (
        <NoEventsFound />
      ) : (
        <EventList events={events} />
      )}

      {events.length > 0 && (
        <Pagination
          onChange={(value) => {
            handleFilterChange("page", value.toString());
          }}
          total={totalPages}
          color="warning"
          page={page}
        />
      )}
    </div>
  );
}

function NoEventsFound() {
  return (
    <div className="w-full pt-[150px] flex justify-center items-center">
      <div className="relative h-[300px] w-[300px]">
        <Image fill src={noEventsFound} alt="no events found graphic" />
      </div>
    </div>
  );
}
