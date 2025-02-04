"use client";

import { searchEvents } from "@/lib/actions/searchEvents";
import { Event } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useSearchEvents(searchTerm: string) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function search() {
      const events = await searchEvents(searchTerm);
      setEvents(events);
    }
    search();
  }, [searchTerm]);

  return { events };
}
