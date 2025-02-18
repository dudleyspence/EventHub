import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategory } from "@/lib/actions/fetchCategory";
import React from "react";

interface PageProps {
  params: Promise<{ category: string | undefined }>;
}

export default async function page({ params }: PageProps) {
  const { category } = await params;

  const decodedCategory = category ? decodeURIComponent(category) : undefined;

  const fullCategory = decodedCategory
    ? await fetchCategory(decodedCategory)
    : undefined;

  if (!fullCategory && category !== "all") {
    return <div>Category not found.</div>;
  }

  return (
    <div className="pt-10 w-full">
      <EventsListContainer category={decodedCategory} />;
    </div>
  );
}
