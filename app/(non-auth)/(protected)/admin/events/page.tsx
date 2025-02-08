import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import React from "react";

export default async function page() {
  const allCategories = await fetchCategories();

  return (
    <div className="pt-10 w-full">
      <h1 className="w-full text-center font-bold text-5xl mb-10">
        Browse Events
      </h1>
      <EventsListContainer categories={allCategories} />;
    </div>
  );
}
