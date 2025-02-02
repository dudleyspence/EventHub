"use server";

import { getEvent } from "@/lib/event";
import {
  createUserEventAttendance,
  findEventAttendance,
} from "@/lib/eventAttendence";
import { getUserById } from "@/lib/user";

export async function attendEventAction(user_id: string, event_id: string) {
  // checks event is valid
  const eventExists = await getEvent(event_id);
  if (!eventExists) {
    throw new Error("Event not found");
  }

  // checks user is valid
  const userExists = await getUserById(user_id);
  if (!userExists) {
    throw new Error("User not found");
  }

  // checks user is not already attending this event
  const alreadyAttending = await findEventAttendance(user_id, event_id);
  if (alreadyAttending) {
    throw new Error("User is already attending this event");
  }

  // checks event is not at max capacity
  if (
    eventExists.maxCapacity &&
    eventExists.totalAttendees >= eventExists.maxCapacity
  ) {
    throw new Error("Event has reached maximum capacity");
  }

  // create event attendance
  const attendance = await createUserEventAttendance(user_id, event_id);

  if (!attendance) {
    throw new Error("Failed to create event attendance");
  }

  return { success: "User attendance created" };
}
