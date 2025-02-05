import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategory } from "@/lib/actions/fetchCategory";
import Image from "next/image";
import React from "react";

interface PageProps {
  params: {
    category?: string;
  };
}

export default async function page({ params }: PageProps) {
  const { category } = await params;

  const decodedCategory = category ? decodeURIComponent(category) : undefined;

  const fullCategory = decodedCategory
    ? await fetchCategory(decodedCategory)
    : undefined;

  return (
    <div className="pt-10 w-full">
      {fullCategory && (
        <div className="w-full bg-yellow-100 h-[400px] sm:h-[280px] mb-5 flex flex-col-reverse sm:flex-row justify-between rounded-md">
          <div>
            <h1 className="text-left pl-10 pt-5 p-2 sm:p-10  font-bold text-5xl">
              {fullCategory.name}
            </h1>
            <p className="text-left pl-10 mr-5 p-2 font-bold text-lg sm:text-xl mb-5">
              {fullCategory.description}
            </p>
          </div>

          <div className="relative sm:h-[280px] w-full h-[200px] sm:w-2/3 md:w-1/2">
            <Image
              fill
              className="object-cover rounded-md"
              src={fullCategory.image}
              alt={fullCategory.name}
            />
          </div>
        </div>
      )}
      <EventsListContainer category={decodedCategory} />;
    </div>
  );
}
