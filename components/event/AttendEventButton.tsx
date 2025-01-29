"use client";
import { attendEventAction } from "@/actions/attendEvent";
import { checkAttendance } from "@/actions/checkAttendance";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

export default function AttendEventButton({ event_id }: { event_id: string }) {
  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useCurrentUser();

  useEffect(() => {
    async function isAttending() {
      if (!user || !user.id) return;
      const attendance = await checkAttendance(user.id, event_id);
      setAttending(attendance);
    }
    isAttending();
    setLoading(false);
  }, [user, event_id]);

  async function handleAttendEvent() {
    setLoading(true);
    if (!user || !user.id || !event_id) return;
    try {
      const response = await attendEventAction(user.id, event_id);
      if (response.success) {
        setAttending(true);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to join event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {attending ? (
        <Button isLoading={loading} disabled={loading}>
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
