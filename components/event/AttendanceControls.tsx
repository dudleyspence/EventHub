"use client";
import React, { useState } from "react";
import AttendEventButton from "./AttendEventButton";
import Capacity from "./CapacityChart";
import { Event } from "@prisma/client";
import useAttendEvent from "@/hooks/useAttendEvent";

export default function AttendanceControls({
  event,
  setShowSuccessAlert,
}: {
  event: Event;
  setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [attendanceValue, setAttendanceValue] = useState<number>(
    event.totalAttendees
  );

  const { handleAttendEvent, handleRemoveAttendance, loading, attending } =
    useAttendEvent(event.id, setAttendanceValue, setShowSuccessAlert);

  return (
    <div className="flex flex-row gap-5">
      <AttendEventButton
        handleAttendEvent={handleAttendEvent}
        loading={loading}
        attending={attending}
        handleRemoveAttendance={handleRemoveAttendance}
      />
      {event.maxCapacity && (
        <Capacity
          totalAttendees={attendanceValue}
          maxCapacity={event.maxCapacity}
        />
      )}
    </div>
  );
}
