"use client";

import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Button } from "@heroui/react";

interface AttendEventButtonProps {
  handleAttendEvent: () => void;
  handleRemoveAttendance: () => void;
  attending: boolean;
  loading: boolean;
  success: boolean;
}

export default function AttendEventButton({
  loading,
  attending,
  handleAttendEvent,
  handleRemoveAttendance,
  success,
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

  useEffect(() => {
    if (success) {
      handleConfetti();
    }
  }, [success]);

  return (
    <div className="w-full">
      {attending ? (
        <Button
          ref={buttonRef}
          isLoading={loading}
          disabled={loading}
          onPress={handleRemoveAttendance}
          color="warning"
          className="w-[175px]"
        >
          Attending
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          isLoading={loading}
          disabled={loading}
          onPress={handleAttendEvent}
          className="w-[175px]"
        >
          Attend Event
        </Button>
      )}
    </div>
  );
}
