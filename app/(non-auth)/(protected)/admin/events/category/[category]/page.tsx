import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import React from "react";

interface PageProps {
  params: Promise<{ category: string | undefined }>;
}

export default async function page({ params }: PageProps) {
  let { category } = await params;
  const allCategories = await fetchCategories();

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
      <EventsListContainer categories={allCategories} category={category} />;
    </div>
  );
}
