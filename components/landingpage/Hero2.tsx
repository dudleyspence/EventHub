"use client";
import React from "react";
import Image from "next/image";
import HeroText from "./HeroText";

// maybe for mobile make the image fullscreen and the text ontop

export default function Hero2() {
  return (
    <div className="hero flex flex-col items-end py-10 sm:py-10">
      <div className="relative w-full h-1/2 overflow-hidden lg:rounded-xl shadow-2xl">
        <Image
          className="object-cover overflow-hidden"
          fill
          priority
          alt="party"
          src="https://c0.wallpaperflare.com/path/857/866/439/person-candid-livemusic-festival-e5d1f147d41c46e564eb9920bb3faf03.jpg
"
        />
      </div>
      <div className="w-full h-1/2 p-8">
        <HeroText />
      </div>
    </div>
  );
}
