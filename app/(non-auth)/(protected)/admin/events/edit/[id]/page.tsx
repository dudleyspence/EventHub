import EditEventForm from "@/components/admin/editEvent/EditEventForm";
import { fetchSingleEvent } from "@/lib/actions/fetchSingleEvent";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const event = await fetchSingleEvent(id);

  return (
    <div className="w-full">
      <EditEventForm event={event} />
    </div>
  );
}
