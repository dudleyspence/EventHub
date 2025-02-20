"use client";
import BackButton from "@/components/UI/BackButton";
import Image from "next/image";
import error from "@/public/graphics/Error.png";

import React from "react";

export default function page() {
  return (
    <div className="h-[500px] gap-10 flex flex-col justify-center items-center">
      <div className="relative h-[250px] w-[250px]">
        <Image
          className={`object-cover overflow-hidden transition-opacity duration-700 ease-in-out`}
          src={error}
          priority
          fill
          alt="error graphic"
        />
      </div>
      <BackButton />
    </div>
  );
}
