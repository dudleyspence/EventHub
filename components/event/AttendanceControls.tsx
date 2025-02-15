"use client";
import React from "react";
import AttendEventButton from "./AttendEventButton";
import { Event } from "@prisma/client";
import useAttendEvent from "@/hooks/useAttendEvent";
import { Button } from "@heroui/react";

export default function AttendanceControls({
  event,
  setShowSuccessAlert,
  setAttendanceValue,
}: {
  event: Event;
  setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setAttendanceValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    handleAttendEvent,
    handleRemoveAttendance,
    loading,
    attending,
    success,
  } = useAttendEvent(event.id, setAttendanceValue, setShowSuccessAlert);

  return (
    <div className="flex flex-row xs:flex-col gap-3 justify-start xs:justify-end items-end ">
      <AttendEventButton
        handleAttendEvent={handleAttendEvent}
        loading={loading}
        attending={attending}
        success={success}
        handleRemoveAttendance={handleRemoveAttendance}
      />
      <Button className="min-w-[140px]">Add to Calendar</Button>
    </div>
  );
}
