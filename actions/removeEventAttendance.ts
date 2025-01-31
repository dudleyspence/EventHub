"use server";

import { deleteUserEventAttendance } from "@/data/eventAttendence";

export async function removeEventAttendance(user_id: string, event_id: string) {
  return await deleteUserEventAttendance(user_id, event_id);
}
