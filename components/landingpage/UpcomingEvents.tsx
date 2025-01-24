"use client";

import React from "react";
import EventCard from "../events/EventCard";
import { Event } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { Pagination, Navigation } from "swiper/modules";

interface UpcomingEventsProps {
  events: Event[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  if (!events || events.length === 0) {
    return <div>Loading events...</div>;
  }
  return (
    <Swiper
      className=" p-10"
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      modules={[Pagination, Navigation]}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      }}
      mousewheel={true}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <EventCard
            name={event.title}
            date={event.date}
            maxCapacity={event.maxCapacity}
            totalAttendees={event.totalAttendees}
            image={event.image}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
