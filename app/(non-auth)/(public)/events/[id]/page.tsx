import React from "react";
import { fetchSingleEvent } from "@/lib/actions/fetchSingleEvent";
import EventContent from "@/components/event/EventContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const event = await fetchSingleEvent(id);

  return <EventContent event={event} />;
}
