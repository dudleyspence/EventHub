import React from "react";
import { fetchSingleEvent } from "@/lib/actions/fetchSingleEvent";
import Image from "next/image";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import Capacity from "@/components/event/CapacityChart";
import DeleteEventButtton from "@/components/admin/DeleteEventButton";
import { currentUser } from "@/lib/auth";
import EditEventButton from "@/components/admin/dashboard/EditEventButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const event = await fetchSingleEvent(id);
  const user = await currentUser();

  return (
    <div className="w-full">
      <div className="mt-5 relative w-full rounded-xl h-[400px]">
        <Image
          className="object-cover overflow-hidden rounded-xl"
          fill
          alt={event.title}
          src={event.image}
        />
        <div className="absolute bottom-2 right-2">
          {event.maxCapacity && (
            <Capacity
              totalAttendees={event.totalAttendees}
              maxCapacity={event.maxCapacity}
            />
          )}
        </div>
      </div>
      <div className="p-5 px-4 xl:px-0 w-full">
        <div className=" flex flex-col xs:flex-row justify-between gap-5">
          <div>
            <p>{FormatDateToReadable(event.date)}</p>
            <h1 className="my-5 text-3xl font-bold">{event.title}</h1>
          </div>
          <div className="flex flex-col gap-5">
            <EditEventButton event_id={event.id} />
            {user && user.id && (
              <DeleteEventButtton event_id={event.id} user_id={user.id} />
            )}
          </div>
        </div>
        <p className="mt-10">{event.description}</p>
      </div>
    </div>
  );
}
