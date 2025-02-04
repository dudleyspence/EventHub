"use client";

import { Button } from "@nextui-org/react";
import React from "react";

interface AttendEventButtonProps {
  handleAttendEvent: () => void;
  handleRemoveAttendance: () => void;
  attending: boolean;
  loading: boolean;
}

export default function AttendEventButton({
  loading,
  attending,
  handleAttendEvent,
  handleRemoveAttendance,
}: AttendEventButtonProps) {
  return (
    <div>
      {attending ? (
        <Button
          isLoading={loading}
          disabled={loading}
          onPress={handleRemoveAttendance}
          color="warning"
        >
          Attending
        </Button>
      ) : (
        <Button
          isLoading={loading}
          disabled={loading}
          onPress={handleAttendEvent}
        >
          Attend Event
        </Button>
      )}
    </div>
  );
}
