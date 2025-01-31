"use client";

import React from "react";
import EventCard from "../EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { Pagination, Navigation, Mousewheel, A11y } from "swiper/modules";
import { FetchEventsOutput } from "@/types/events";
import Link from "next/link";
import { Event } from "@prisma/client";

export default function UpcomingEvents({ events }: { events: Event[] }) {
  if (!events || events.length === 0) {
    return <div>Loading events...</div>;
  }

  console.log(events);
  return (
    <Swiper
      className="w-screen max-w-[1280px] mt-8"
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Mousewheel, A11y]}
      mousewheel={{
        forceToAxis: true,
      }}
    >
      {events.map((event) => (
        <SwiperSlide
          key={event.id}
          className="mx-3 min-w-[350px] min-h-[400px] max-w-fit my-5 cursor-pointer"
        >
          <EventCard
            id={event.id}
            name={event.title}
            date={event.date}
            maxCapacity={event.maxCapacity}
            totalAttendees={event.totalAttendees}
            image={event.image}
            category={event.category}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
