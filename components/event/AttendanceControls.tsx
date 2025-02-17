"use client";
import React from "react";
import AttendEventButton from "./AttendEventButton";
import { Event } from "@prisma/client";
import useAttendEvent from "@/hooks/useAttendEvent";
import AddToCalender from "./AddToCalender";

export default function AttendanceControls({
  event,
  setAttendanceValue,
}: {
  event: Event;
  setAttendanceValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    handleAttendEvent,
    handleRemoveAttendance,
    loading,
    attending,
    success,
  } = useAttendEvent(event.id, setAttendanceValue, event.title);

  return (
    <div className="flex flex-row xs:flex-col gap-3 justify-start xs:justify-end items-end ">
      <AttendEventButton
        handleAttendEvent={handleAttendEvent}
        loading={loading}
        attending={attending}
        success={success}
        handleRemoveAttendance={handleRemoveAttendance}
      />
      <AddToCalender event_id={event.id} />
    </div>
  );
}
