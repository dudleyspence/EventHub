import CategoryBanner from "@/components/eventslist/CategoryBanner";
import EventsListContainer from "@/components/eventslist/EventsListContainer";
import React from "react";

export default async function page() {
  return (
    <div className="pt-10 w-full">
      <CategoryBanner />
      <EventsListContainer />;
    </div>
  );
}
