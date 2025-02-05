import EventsListContainer from "@/components/eventslist/EventsListContainer";
import React from "react";

interface PageProps {
  params: {
    category?: string;
  };
}

export default async function page({ params }: PageProps) {
  const { category } = await params;

  return (
    <div className="pt-10 w-full">
      <h1 className="w-full text-center font-bold text-5xl mb-10">
        Browse Events
      </h1>
      <EventsListContainer category={category} />;
    </div>
  );
}
