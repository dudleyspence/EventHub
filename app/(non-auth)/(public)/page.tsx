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
      <Hero />
      <div className="h-screen"> this is a test</div>
    </div>
  );
}
