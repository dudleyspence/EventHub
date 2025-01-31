"use client";
import { fetchEventsAction } from "@/lib/actions/fetchEvents";
import React, { useEffect, useState } from "react";
import EventList from "./EventsList";
import { Pagination } from "@nextui-org/react";
import { Event } from "@prisma/client";
import LoadingList from "../loading/LoadingList";
import FilterSidebar from "./FilterSidebar";
import FilterDrawer from "./FilterDrawer";

export default function EventsListContainer() {
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    async function refetchData() {
      try {
        const response = await fetchEventsAction(filters);
        setEvents(response.events);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch events");
      } finally {
        setIsLoading(false);
      }
    }
    refetchData();
  }, [filters]);

  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
  };

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
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>
        <div id="event-list" className="w-full lg:w-3/4">
          <div className="justify-self-end mr-10">
            <FilterDrawer filters={filters} setFilters={setFilters} />
          </div>
          {isLoading ? (
            <LoadingList eventsPerPage={filters.limit} />
          ) : (
            <EventList events={events} />
          )}
        </div>
      </div>

      <Pagination
        onChange={handlePageChange}
        total={totalPages}
        color="warning"
        page={filters.page}
      />
    </div>
  );
}
