import FiltersSkeleton from "@/components/loading/FiltersSkeleton";
import LoadingList from "@/components/loading/LoadingList";
import React from "react";

export default function loading() {
  return (
    <div className="pt-10 w-full">
      <div className="w-full bg-yellow-100 h-[250px]">
        <h1 className="w-full text-left p-10 font-bold text-5xl mb-10">
          Browse Events
        </h1>
      </div>

      <div className="w-full flex flex-col items-center gap-16">
        <div className="w-full flex flex-row gap-5">
          <div id="filters" className="hidden lg:block lg:w-1/4">
            <FiltersSkeleton />
          </div>
          <div id="event-list" className="w-full lg:w-3/4">
            <LoadingList eventsPerPage={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
