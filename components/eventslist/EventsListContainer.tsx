"use client";
import React from "react";
import EventList from "./EventsList";
import { Pagination } from "@nextui-org/react";
import LoadingList from "../loading/LoadingList";
import FilterSidebar from "./FilterSidebar";
import FilterDrawer from "./FilterDrawer";
import { useEventListFilters } from "@/hooks/useEventListFilters";

interface searchParamProps {
  category?: string | undefined;
}

export default function EventsListContainer({ category }: searchParamProps) {
  const {
    isLoading,
    error,
    events,
    totalPages,
    date,
    page,
    handleFilterChange,
  } = useEventListFilters(category);

  if (error) {
    return (
      <div className="w-full text-center">
        <h1>There seems to have been a problem</h1>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-16">
      <div className="w-full flex flex-row gap-5">
        <div id="filters" className="hidden lg:block lg:w-1/4">
          <FilterSidebar
            category={category}
            date={date}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div id="event-list" className="flex flex-col w-full lg:w-3/4">
          <div className="w-full flex flex-row justify-end gap-10 px-10">
            <FilterDrawer
              category={category}
              date={date}
              handleFilterChange={handleFilterChange}
            />
          </div>
          {isLoading ? (
            <LoadingList eventsPerPage={10} />
          ) : (
            <EventList events={events} />
          )}
        </div>
      </div>

      <Pagination
        onChange={(value) => {
          handleFilterChange("page", value.toString());
        }}
        total={totalPages}
        color="warning"
        page={page}
      />
    </div>
  );
}
