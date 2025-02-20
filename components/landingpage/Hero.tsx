import React from "react";
import { RotateWords } from "../UI/RotateWords";
import { Category } from "@prisma/client";
import HeroButtons from "./HeroButtons";
import Image from "next/image";
import { currentUser } from "@/lib/auth";
import HeroImage from "@/public/brand/HeroImage.jpg";

export default async function Hero({ categories }: { categories: Category[] }) {
  const userLoggedIn = !!(await currentUser());

  return (
    <div className="w-full h-[600px] flex flex-col items-end py-10 ">
      <div className="relative w-full h-full overflow-hidden lg:rounded-xl shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <RotateWords text="Events you love..." words={categories} />
        </div>
        <div className="absolute bottom-10 z-10 inset-0">
          <HeroButtons session={userLoggedIn} />
        </div>
        <Image
          id="LANDINGPAGEIMAGE"
          className={`object-cover overflow-hidden transition-opacity duration-700 ease-in-out`}
          src={HeroImage}
          priority
          fill
          alt="hero image"
        />
      </div>
    </div>
  );
}
