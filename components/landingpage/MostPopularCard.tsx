"use client";
import React from "react";
import { Event } from "@prisma/client";
import Image from "next/image";
import Capacity from "../event/CapacityChart";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import { Chip } from "@nextui-org/react";

export default function MostPopularCard({ event }: { event: Event }) {
  if (!event) return null;

  return (
    <div className="relative w-full h-[400px] shadow-xl sm:rounded-xl">
      <Image
        fill
        alt={event.title}
        className="object-cover sm:rounded-xl"
        src={event.image}
      />
      <div className="w-full h-[150px] absolute bottom-0 sm:rounded-xl shadow-small overflow-hidden bg-white/80 flex flex-row justify-between gap-4 ">
        <div id="left" className="p-4">
          <h1 className="font-bold text-2xl mb-1">{event.title}</h1>
          <p className="text-sm text-gray-900 font-bold">
            {FormatDateToReadable(event.date)}
          </p>
          {event.category && (
            <Chip className="text-white bg-slate-700 mt-4">
              {event.category}
            </Chip>
          )}
        </div>
        <div id="right">
          {event.maxCapacity && (
            <Capacity
              totalAttendees={event.totalAttendees}
              maxCapacity={event.maxCapacity}
            />
          )}
        </div>
      </div>
    </div>
  );
}
