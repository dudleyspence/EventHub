"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { checkAttendance } from "@/lib/actions/checkAttendance";
import { useLoginModal } from "@/context/LoginModelProvider";
import { attendEventAction } from "@/lib/actions/attendEvent";
import { removeEventAttendance } from "@/lib/actions/removeEventAttendance";

export default function useAttendEvent(
  event_id: string,
  setAttendanceValue: React.Dispatch<React.SetStateAction<number>>,
  setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>
) {
  const user = useCurrentUser();
  const { openLoginModal } = useLoginModal();

  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setShowSuccessAlert(true);
        // optimistically render the update
        setAttendanceValue((prevAttendance) => prevAttendance + 1);
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
      if (response) {
        setAttending(false);
        // optimistically render the update
        setAttendanceValue((prevAttendance) => prevAttendance - 1);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to leave event");
    } finally {
      setLoading(false);
    }
  }

  return { attending, loading, handleAttendEvent, handleRemoveAttendance };
}
