"use client";

import React, { useRef } from "react";
import confetti from "canvas-confetti";
import { Button } from "@heroui/react";

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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleConfetti = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
    });
  };

  return (
    <div>
      {attending ? (
        <Button
          isLoading={loading}
          disabled={loading}
          onPress={handleRemoveAttendance}
          color="warning"
          className="w-[140px]"
        >
          Attending
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          isLoading={loading}
          disabled={loading}
          onPress={() => {
            handleAttendEvent();
            handleConfetti();
          }}
          className="w-[140px]"
        >
          Attend Event
        </Button>
      )}
    </div>
  );
}
