"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function error() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center">
        <div className="relative h-48 w-48">
          <Image
            className="opacity-35"
            fill
            src="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739046473/EventHubGraphicYellow_n5y6ik.png"
            alt="eventhub graphic"
          />
        </div>
        <div className="absolute">
          <h1 className="text-center text-3xl font-extrabold">No results</h1>
          <h1 className="text-center text-3xl font-extrabold">found</h1>
        </div>
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-block px-5 py-3 shadow-md text-white text-sm font-medium rounded-xl bg-orange-500 hover:bg-orange-400"
        >
          Back to Search
        </Link>
      </div>
    </div>
  );
}
