// import { auth } from "@/auth";
import Hero from "@/components/landingpage/Hero";
import React from "react";

import UpcomingEventsContainer from "@/components/landingpage/UpcomingEventsContainer";
import MostPopular from "@/components/landingpage/MostPopular";

export default async function LandingPage() {
  // const session = await auth();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pb-20">
      <Hero />
      <UpcomingEventsContainer />
    </div>
  );
}
