import LoadingList from "@/components/loading/LoadingList";
import React from "react";

export default function loading() {
  return (
    <div className="pt-10 w-full">
      <LoadingList eventsPerPage={10} />;
    </div>
  );
}
