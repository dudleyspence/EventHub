// import { auth } from "@/auth";
import Hero from "@/components/landingpage/Hero";
import React from "react";

import UpcomingEventsContainer from "@/components/landingpage/UpcomingEventsContainer";
import TesterSwiper from "@/components/landingpage/testerswiper";

export default async function LandingPage() {
  // const session = await auth();
  return (
    <div className="w-full max-w-[1280px] flex flex-col justify-center items-center pb-20">
      <Hero />
      <UpcomingEventsContainer />
    </div>
  );
}
