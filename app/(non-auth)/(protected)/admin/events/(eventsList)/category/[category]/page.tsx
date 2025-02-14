import CategoryBanner from "@/components/eventslist/CategoryBanner";
import EventsListContainer from "@/components/eventslist/EventsListContainer";
import { fetchCategory } from "@/lib/actions/fetchCategory";
import React from "react";

export default async function page() {
  return <EventsListContainer />;
}
