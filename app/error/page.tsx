"use client";
import BackButton from "@/components/UI/BackButton";
import ServerImage from "@/components/UI/ServerImage";

import React from "react";

export default function page() {
  return (
    <div className="h-[500px] gap-10 flex flex-col justify-center items-center">
      <div className="relative h-[250px] w-[250px]">
        <ServerImage
          isPriority={true}
          imageUrl="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739216501/Error_hjgei7.png"
          alt="error graphic"
        />
      </div>
      <BackButton />
    </div>
  );
}
