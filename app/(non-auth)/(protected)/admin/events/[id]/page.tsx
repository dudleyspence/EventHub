import React from "react";
import { fetchSingleEvent } from "@/lib/actions/fetchSingleEvent";
import Image from "next/image";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import Capacity from "@/components/event/CapacityChart";
import DeleteEventButtton from "@/components/admin/DeleteEventButtton";
import { currentUser } from "@/lib/auth";

interface PageProps {
  params: {
    id: string;
  };
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
      </div>
      <div className="p-5 px-7  w-full">
        <div className=" flex flex-row justify-between">
          <div>
            <p>{FormatDateToReadable(event.date)}</p>
            <h1 className="my-5 text-3xl font-bold">{event.title}</h1>
          </div>
          <div className="flex flex-row gap-5">
            <div>
              {/* <Button>Update Event</Button> */}
              <DeleteEventButtton event_id={event.id} user_id={user?.id} />
            </div>
            {event.maxCapacity && (
              <Capacity
                totalAttendees={event.totalAttendees}
                maxCapacity={event.maxCapacity}
              />
            )}
          </div>
        </div>
        <p className="mt-10">{event.description}</p>
      </div>
    </div>
  );
}
