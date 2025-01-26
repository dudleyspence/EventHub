"use client";
import React from "react";
import Image from "next/image";
import { RotateWords } from "../UI/RotateWords";
import { Button } from "@nextui-org/react";

export default function Hero() {
  return (
    <div className="w-full h-[600px] flex flex-col items-end py-10 sm:py-10">
      <div className="relative w-full h-full overflow-hidden lg:rounded-xl shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <RotateWords text="Events you love..." words={eventTypes} />
        </div>
        <div className="absolute bottom-10 z-10 inset-0 flex flex-row items-end justify-center gap-5 mt-10">
          <Button
            size="lg"
            radius="full"
            variant="solid"
            className="text-xl text-white font-bold bg-pink-800"
            as="a"
            href="/events"
          >
            Browse Events
          </Button>
          <Button
            size="lg"
            radius="full"
            variant="solid"
            className="text-xl text-black font-bold bg-amber-200"
            as="a"
            href="/signup"
          >
            Register
          </Button>
        </div>
        <Image
          className="object-cover overflow-hidden"
          fill
          priority
          alt="party"
          src="https://c0.wallpaperflare.com/path/857/866/439/person-candid-livemusic-festival-e5d1f147d41c46e564eb9920bb3faf03.jpg"
        />
      </div>
    </div>
  );
}

const eventTypes = [
  "Live music",
  "Cinema",
  "Theatre",
  "Comedy",
  "Workshops",
  "Festivals",
  "Sports",
  "Conferences",
  "Exhibitions",
  "Networking",
  "Family events",
  "Food and drink",
  "Art shows",
  "Dance performances",
  "Literary events",
  "Outdoor activities",
  "Parties",
  "Charity events",
  "Webinars",
  "Gaming tournaments",
  "Tech talks",
  "Cultural celebrations",
  "Stand-up comedy",
  "Pop-up markets",
  "Yoga and fitness",
  "Historical tours",
  "Science fairs",
  "Book signings",
  "Fashion shows",
  "Photography exhibitions",
];
