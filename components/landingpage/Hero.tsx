import React from "react";
import { RotateWords } from "../UI/RotateWords";
import { Category } from "@prisma/client";
import HeroButtons from "./HeroButtons";
import Image from "next/image";

export default function Hero({ categories }: { categories: Category[] }) {
  return (
    <div className="w-full h-[600px] flex flex-col items-end py-10 ">
      <div className="relative w-full h-full overflow-hidden lg:rounded-xl shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <RotateWords text="Events you love..." words={categories} />
        </div>
        <div className="absolute bottom-10 z-10 inset-0">
          <HeroButtons />
        </div>
        <Image
          className={`object-cover overflow-hidden transition-opacity duration-700 ease-in-out`}
          src="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739023224/EventHubHeroImage_ot7umq.jpg"
          priority
          fill
          alt="hero image"
        />
      </div>
    </div>
  );
}
