import React from "react";
import { fetchSingleEvent } from "@/lib/actions/fetchSingleEvent";
import Image from "next/image";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import AttendanceControls from "@/components/event/AttendanceControls";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const event = await fetchSingleEvent(id);

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

          <AttendanceControls event={event} />
        </div>
        <p className="mt-10">{event.description}</p>
      </div>
    </div>
  );
}
