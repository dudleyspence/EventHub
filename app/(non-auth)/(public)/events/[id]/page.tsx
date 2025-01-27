import Capacity from "@/components/event/CapacityChart";
import React from "react";

export default function page() {
  return (
    <div>
      Signle Event Page
      <Capacity totalAttendees={30} maxCapacity={258} />
    </div>
  );
}
