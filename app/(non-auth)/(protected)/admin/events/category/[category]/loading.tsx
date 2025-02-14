import FiltersSkeleton from "@/components/loading/FiltersSkeleton";
import LoadingList from "@/components/loading/LoadingList";
import React from "react";

export default function loading() {
  return (
    <div className="pt-10 w-full">
      <div className="w-full bg-yellow-100 flex flex-row justify-start h-[400px] sm:h-[280px] p-10 mb-5"></div>
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
