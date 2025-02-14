"use client";
import React from "react";
import EventList from "./EventsList";
import { Pagination } from "@nextui-org/react";
import LoadingList from "../loading/LoadingList";

import { useEventListFilters } from "@/hooks/useEventListFilters";

interface searchParamProps {
  category?: string | undefined;
}

export default function EventsListContainer({ category }: searchParamProps) {
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
