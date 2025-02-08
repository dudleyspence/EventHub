"use client";

import { fetchEventsAction } from "@/lib/actions/fetchEvents";
import { EventListEvent, eventsFilters } from "@/types/events";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useEventListFilters(category: string | undefined) {
  const searchParams = useSearchParams();

  const [events, setEvents] = useState<EventListEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  let page = Number(searchParams.get("page")) || 1;
  if (!Number.isInteger(page)) {
    page = 1;
  }

  // checks provided date is valid and defaults to any
  let date = searchParams.get("date") || "any";
  if (!["any", "week", "month"].includes(date)) {
    date = "any";
  }

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const filters: eventsFilters = {
      page: page,
    };

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

  const router = useRouter();

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

  return {
    events,
    totalPages,
    date,
    page,
    isLoading,
    error,
    handleFilterChange,
  };
}
