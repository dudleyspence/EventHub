"use client";
import React, { useState } from "react";
import AttendEventButton from "./AttendEventButton";
import Capacity from "./CapacityChart";
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
  const { handleAttendEvent, handleRemoveAttendance, loading, attending } =
    useAttendEvent(event.id, setAttendanceValue, setShowSuccessAlert);

  return (
    <div className="flex flex-col gap-3 justify-end items-end w-[140px]">
      <AttendEventButton
        handleAttendEvent={handleAttendEvent}
        loading={loading}
        attending={attending}
        handleRemoveAttendance={handleRemoveAttendance}
      />
      <Button fullWidth>Add to Calendar</Button>
    </div>
  );
}
