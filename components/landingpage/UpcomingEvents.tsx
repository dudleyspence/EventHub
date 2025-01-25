"use client";

import React from "react";
import EventCard from "../events/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { Pagination, Navigation, Mousewheel } from "swiper/modules";
import { FetchEventsOutput } from "@/types/events";
import Link from "next/link";

export default function UpcomingEvents({
  events,
}: {
  events: FetchEventsOutput;
}) {
  if (!events || events.length === 0) {
    return <div>Loading events...</div>;
  }
  return (
    <Swiper
      className="w-full bg-rose-200 rounded-xl"
      spaceBetween={30}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Mousewheel]}
      mousewheel={true}
    >
      {events.map((event) => (
        <SwiperSlide key={event.id} className="max-w-fit my-10 cursor-pointer">
          <Link href={`/events/${event.id}`}>
            <EventCard
              name={event.title}
              date={event.date}
              maxCapacity={event.maxCapacity}
              totalAttendees={event.totalAttendees}
              image={event.image}
              category={event.category}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
