import Image from "next/image";
import React from "react";
import MostPopularImage from "@/public/graphics/MOST_POPULAR.png";

export default function MostPopular() {
  return (
    <div className="w-full flex flex-col mt-6">
      <Image
        className="self-center"
        height={80}
        alt="most popular section heading"
        src={MostPopularImage}
      />
      <p>jnoqwnd</p>
    </div>
  );
}
