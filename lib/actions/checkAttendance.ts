"use server";
import { findEventAttendance } from "@/lib/eventAttendence";

export async function checkAttendance(user_id: string, event_id: string) {
  const attendance = await findEventAttendance(user_id, event_id);
  if (attendance) {
    return true;
  } else {
    return false;
  }
}
