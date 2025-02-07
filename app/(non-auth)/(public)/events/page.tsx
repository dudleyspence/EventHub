import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import React from "react";

export default async function page() {
  const allCategories = await fetchCategories();

  return (
    <div className="pt-10 w-full">
      <div className="w-full bg-yellow-100 h-[250px] mb-5">
        <h1 className="w-full text-left p-10 font-bold text-5xl mb-10">
          Browse Events
        </h1>
      </div>
      <EventsListContainer categories={allCategories} />;
    </div>
  );
}
