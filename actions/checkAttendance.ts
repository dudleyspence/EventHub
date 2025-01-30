"use server";
import { getEventAttendance } from "@/data/eventAttendence";

export async function checkAttendance(user_id: string, event_id: string) {
  const attendance = await getEventAttendance(user_id, event_id);
  if (attendance) {
    return true;
  } else {
    return false;
  }
}
