import Image from "next/image";
import React from "react";
import MostPopularImage from "@/public/graphics/MOST_POPULAR.png";
import { fetchEventsAction } from "@/actions/fetchEvents";
import MostPopularCard from "./MostPopularCard";
import Link from "next/link";

export default async function MostPopular() {
  const popularEvents = await fetchEventsAction({
    limit: 2,
    orderBy: "totalAttendees",
    sort: "desc",
  });

  return (
    <div className="w-full flex flex-col mt-6 gap-10">
      <Image
        className="self-center"
        height={80}
        alt="most popular section heading"
        src={MostPopularImage}
      />
      <div className=" w-full  gap-10 grid grid-cols-1 md:grid-cols-2">
        {popularEvents.events.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <MostPopularCard event={event} />
          </Link>
        ))}
      </div>
    </div>
  );
}
