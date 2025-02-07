// import { auth } from "@/auth";
import Hero from "@/components/landingpage/Hero";
import React from "react";

import UpcomingEventsContainer from "@/components/landingpage/UpcomingEventsContainer";
import MostPopular from "@/components/landingpage/MostPopularContainer";
import { fetchCategories } from "@/lib/actions/fetchCategories";

export default async function LandingPage() {
  // const session = await auth();
  const categories = await fetchCategories();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center pb-20">
      <Hero categories={categories} />
      <UpcomingEventsContainer />
      <MostPopular />
    </div>
  );
}
