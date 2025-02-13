import React from "react";
import EventCardSkeleton from "./EventCardSkeleton";

export default function LoadingList({
  eventsPerPage,
}: {
  eventsPerPage: number;
}) {
  const placeholderArray = Array.from({ length: eventsPerPage });
  return (
    <div className="w-full grid sm:grid-cols-2 gap-5 mt-8 px-5">
      {placeholderArray.map((item, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}
