"use client";
import React from "react";
import Image from "next/image";
import HeroText from "./HeroText";

// maybe for mobile make the image fullscreen and the text ontop

export default function Hero() {
  return (
    <div className="hero flex flex-col md:flex-row-reverse items-end px-8 py-10 sm:py-20">
      <div className="relative md:w-1/2 md:h-full w-full h-2/5 overflow-hidden rounded-xl shadow-2xl">
        <Image
          className="object-cover overflow-hidden"
          fill
          priority
          alt="party"
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D"
        />
      </div>
      <div className="md:w-1/2 md:h-full w-full h-3/5 md:pr-8 pb-5">
        <HeroText />
      </div>
    </div>
  );
}
