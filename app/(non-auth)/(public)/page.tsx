import { auth } from "@/auth";
import Hero from "@/components/landingpage/Hero";
import Image from "next/image";
import React from "react";

import yellowGraphic from "@/public/graphics/EventHubGraphicYellow.png";
import orangeGraphic from "@/public/graphics/EventHubGraphicOrange.png";

export default async function LandingPage() {
  const session = await auth();
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* <Image
        alt="graphic"
        src={yellowGraphic}
        height={450}
        className="hidden mb-4 xs:block fixed top-[-250] right-[-250] blur-sm"
      />
      <Image
        alt="graphic"
        src={orangeGraphic}
        height={700}
        className="hidden mb-4 xs:block fixed bottom-[-250] left-[-250] blur-sm opacity-80"
      /> */}
      <Hero />
    </div>
  );
}
