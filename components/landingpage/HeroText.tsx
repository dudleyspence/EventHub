"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { RotateWords } from "../UI/RotateWords";

export default function HeroText() {
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
  return (
    <div className="flex flex-col justify-end h-full w-full">
      <RotateWords text="Find the events you love..." words={eventTypes} />

      <div className="w-full flex flex-row gap-5 mt-10">
        <Button
          size="lg"
          variant="shadow"
          className="text-xl font-bold bg-orange-400"
        >
          Browse Events
        </Button>
        <Button
          size="lg"
          variant="shadow"
          className="text-xl font-bold bg-amber-200"
        >
          Register
        </Button>
      </div>
    </div>
  );
}
