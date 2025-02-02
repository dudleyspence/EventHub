"use client";
import { attendEventAction } from "@/lib/actions/attendEvent";
import { checkAttendance } from "@/lib/actions/checkAttendance";
import { removeEventAttendance } from "@/lib/actions/removeEventAttendance";
import { useLoginModal } from "@/context/LoginModelProvider";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

interface AttendEventButtonProps {
  event_id: string;
  setAttendance: React.Dispatch<React.SetStateAction<number>>;
}

export default function AttendEventButton({
  event_id,
  setAttendance,
}: AttendEventButtonProps) {
  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();
  const { openLoginModal } = useLoginModal();
  useEffect(() => {
    async function isAttending() {
      if (!user || !user.id) {
        setLoading(false);
        return;
      }
      const attendance = await checkAttendance(user.id, event_id);
      setAttending(attendance);
      setLoading(false);
    }
    isAttending();
  }, [user, event_id]);

  async function handleAttendEvent() {
    setLoading(true);
    if (!user || !user.id) {
      setLoading(false);
      openLoginModal();
      return;
    }
    try {
      const response = await attendEventAction(user.id, event_id);
      if (response.success) {
        setAttending(true);
        // optimistically render the update
        setAttendance((prevAttendance) => prevAttendance + 1);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to join event");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveAttendance() {
    setLoading(true);
    if (!user || !user.id) {
      setLoading(false);
      openLoginModal();
      return;
    }
    try {
      const response = await removeEventAttendance(user.id, event_id);
      console.log("Removed", response);
      if (response) {
        setAttending(false);
        // optimistically render the update
        setAttendance((prevAttendance) => prevAttendance - 1);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to leave event");
    } finally {
      setLoading(false);
    }
  }

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
