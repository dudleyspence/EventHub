"use client";

import { searchEvents } from "@/lib/actions/searchEvents";
import { searchEventsOutput } from "@/types/events";
import { useEffect, useState } from "react";

export default function useSearchEvents(searchTerm: string) {
  const [events, setEvents] = useState<searchEventsOutput[]>([]);

  useEffect(() => {
    async function search() {
      const events = await searchEvents(searchTerm);
      console.log(events);
      setEvents(events);
    }
    search();
  }, [searchTerm]);

  return { events };
}
