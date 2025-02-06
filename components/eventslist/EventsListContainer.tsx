"use client";
import { fetchEventsAction } from "@/lib/actions/fetchEvents";
import React, { useEffect, useState } from "react";
import EventList from "./EventsList";
import { Pagination } from "@nextui-org/react";
import { Event } from "@prisma/client";
import LoadingList from "../loading/LoadingList";
import FilterSidebar from "./FilterSidebar";
import FilterDrawer from "./FilterDrawer";
import { useRouter, useSearchParams } from "next/navigation";
interface searchParamProps {
  category?: string | undefined;
}

export default function EventsListContainer({ category }: searchParamProps) {
  const searchParams = useSearchParams();

  // checks provided page is valid and defaults to 1
  let page = Number(searchParams.get("page")) || 1;
  if (!Number.isInteger(page)) {
    page = 1;
  }

  // checks provided date is valid and defaults to any
  let date = searchParams.get("date") || "any";
  if (!["any", "week", "month"].includes(date)) {
    date = "any";
  }

  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const filters: any = { page: page };

    const today = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);
    const monthFromNow = new Date();
    monthFromNow.setMonth(today.getMonth() + 1);

    if (category) {
      filters.category = category;
    }
    if (date === "week") {
      filters.startDate = today;
      filters.endDate = weekFromNow;
    }
    if (date === "month") {
      filters.startDate = today;
      filters.endDate = monthFromNow;
    }

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
  }, [category, date, page]);

  function handleFilterChange(param: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(param, value);

    if (param !== "page") {
      params.delete("page");
    }
    if (param === "date" && value === "any") {
      params.delete("date");
    }

    let newUrl = `/events?${params.toString()}`;
    if (category) {
      newUrl = `/events/category/${category}?${params.toString()}`;
    }
    router.push(newUrl);
  }

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
        <div id="event-list" className="w-full lg:w-3/4">
          <div className="justify-self-end mr-10">
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
