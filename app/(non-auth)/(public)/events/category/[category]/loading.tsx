import LoadingList from "@/components/loading/LoadingList";
import React from "react";

export default function loading() {
  return <LoadingList eventsPerPage={10} />;
}
