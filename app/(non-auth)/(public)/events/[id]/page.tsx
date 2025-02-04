import React from "react";
import { fetchSingleEvent } from "@/lib/actions/fetchSingleEvent";
import Image from "next/image";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import AttendanceControls from "@/components/event/AttendanceControls";
import EventContent from "@/components/event/EventContent";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const event = await fetchSingleEvent(id);

  return <EventContent event={event} />;
}
