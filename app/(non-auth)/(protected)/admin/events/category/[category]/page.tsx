import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { redirect } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    category?: string;
  };
}

export default async function page({ params }: PageProps) {
  let { category } = await params;

  const categoryList = await fetchCategories();
  category = category ? decodeURIComponent(category) : undefined;

  if (category) {
    category = categoryList.includes(category) ? category : undefined;
  }

  return (
    <div className="pt-10 w-full">
      <h1 className="w-full text-center font-bold text-5xl mb-10">
        Browse Events
      </h1>
      <EventsListContainer category={category} />;
    </div>
  );
}
