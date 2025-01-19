"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function Hero() {
  return (
    <div className="hero flex flex-col-reverse md:flex-row items-end p-6 sm:p-8 md:py-16">
      <div className="md:w-1/2 md:h-full w-full h-1/2 flex flex-col justify-end">
        <div className="text-left text-[100px] bg-clip-text leading-[1.2] font-bold tracking-tighter text-black">
          Find the events you love
        </div>
        <div className="w-full flex flex-row gap-5 mt-10">
          <Button
            size="lg"
            variant="shadow"
            className="text-xl font-bold bg-orange-400"
          >
            Browse Events
          </Button>
          <Button size="lg" variant="shadow" className="text-xl font-bold">
            Register
          </Button>
        </div>
      </div>
      <div className="relative md:w-1/2 md:h-full w-full h-1/2 overflow-hidden rounded-xl">
        <Image
          className="object-cover overflow-hidden "
          fill
          priority
          alt="party"
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D"
        />
      </div>
    </div>
  );
}
