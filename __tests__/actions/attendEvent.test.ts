import { attendEventAction } from "@/lib/actions/attendEvent";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { db } from "@/lib/db";

describe("attendEventAction", () => {
  const event_id = "test_id";
  const user_id = "test_id";

  beforeEach(async () => {
    await db.eventAttendee.deleteMany({
      where: { userId: "test_id", eventId: "test_id" },
    });
  });

  afterEach(async () => {
    await db.eventAttendee.deleteMany({
      where: { userId: "test_id", eventId: "test_id" },
    });
    await db.event.update({
      where: { id: event_id },
      data: { totalAttendees: 100 },
    });
  });

  it("returns an error if the event doesnt exist", async () => {
    const user_id = "test_id";
    const event_id = "non_existent_event";

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "Event not found"
    );
  });
  it("returns an error if the user doesnt exist", async () => {
    const event_id = "test_id";
    const user_id = "non_existent_user";

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "User not found"
    );
  });

  it("returns an error if event has reached max capacity", async () => {
    await db.event.update({
      where: { id: event_id },
      data: { totalAttendees: 800 },
    });

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "Event has reached maximum capacity"
    );
  });

  it("returns a success message if the attendance is created", async () => {
    const response = await attendEventAction(user_id, event_id);

    expect(response.success).toBe("User attendance created");
  });

  it("returns an error if the user is alread attending", async () => {
    await attendEventAction(user_id, event_id);

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "User is already attending this event"
    );
  });
});
