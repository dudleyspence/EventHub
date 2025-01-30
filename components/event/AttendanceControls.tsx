"use client";
import React, { useState } from "react";
import AttendEventButton from "./AttendEventButton";
import Capacity from "./CapacityChart";
import { Event } from "@prisma/client";

export default function AttendanceControls({ event }: { event: Event }) {
  const [attendance, setAttendance] = useState<number>(event.totalAttendees);

  return (
    <div className="flex flex-row gap-5">
      <AttendEventButton setAttendance={setAttendance} event_id={event.id} />
      {event.maxCapacity && (
        <Capacity totalAttendees={attendance} maxCapacity={event.maxCapacity} />
      )}
    </div>
  );
}
