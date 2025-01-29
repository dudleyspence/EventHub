import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export async function getEventAttendance(event_id: string, user_id: string) {
  const attendance = await db.eventAttendance.findUnique({
    where: {
      eventId: event_id,
      userId: user_id,
    },
  });
  return attendance;
}
