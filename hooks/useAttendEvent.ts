"use client";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { checkAttendance } from "@/lib/actions/checkAttendance";
import { useLoginModal } from "@/context/LoginModelProvider";
import { attendEventAction } from "@/lib/actions/attendEvent";
import { removeEventAttendance } from "@/lib/actions/removeEventAttendance";
import { useAlert } from "@/context/AlertContext";

export default function useAttendEvent(
  event_id: string,
  setAttendanceValue: React.Dispatch<React.SetStateAction<number>>,
  title: string
) {
  const user = useCurrentUser();
  const { openLoginModal } = useLoginModal();
  const [success, setSuccess] = useState(false);
  const [attending, setAttending] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setMessage, setColor, setShowAlert } = useAlert();

  function updateAlertSuccess() {
    setMessage(`You have successfully signed up to ${title}`);
    setColor("success");
    setShowAlert(true);
  }

  function updateAlertDanger() {
    setMessage(`You are no longer attending this event`);
    setColor("danger");
    setShowAlert(true);
  }

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
        updateAlertSuccess();
        // optimistically render the update
        setAttendanceValue((prevAttendance) => prevAttendance + 1);
        setSuccess(true);
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
        setSuccess(false);
        updateAlertDanger();
        setAttendanceValue((prevAttendance) => prevAttendance - 1);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to leave event");
    } finally {
      setLoading(false);
    }
  }

  return {
    attending,
    loading,
    handleAttendEvent,
    handleRemoveAttendance,
    success,
  };
}
