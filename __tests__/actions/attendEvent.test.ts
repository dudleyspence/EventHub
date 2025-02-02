import { attendEventAction } from "@/lib/actions/attendEvent";
import { describe, expect, it } from "vitest";
import { getEvent } from "@/lib/event";
import { db } from "@/lib/db";

describe("attendEventAction", () => {
  it("returns an error if the event doesnt exist", async () => {
    const user_id = "test_id";
    const event_id = "non_existent_event";

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "Event not found"
    );
  });
  it("returns an error if the user doesnt exist", async () => {
    const event_id = "test_id";
    const user_id = "non_existent_event";

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "User not found"
    );
  });

  it("returns an error if event has max capacity", async () => {
    const event_id = "test_id";
    const user_id = "test_id";
    // test event has a max capacity of 800
    const event = await getEvent(event_id);
    const oldAttendance = event?.totalAttendees;

    await db.event.update({
      where: { id: event_id },
      data: { totalAttendees: 800 },
    });

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "Event has reached maximum capacity"
    );

    await db.event.update({
      where: { id: event_id },
      data: { totalAttendees: oldAttendance },
    });
  });

  it("returns a success message if the attendance is created", async () => {
    const event_id = "test_id";
    const user_id = "test_id";

    const response = await attendEventAction(user_id, event_id);

    expect(response.success).toBe("User attendance created");
  });

  it("returns an error if the user is alread attending", async () => {
    const event_id = "test_id";
    const user_id = "test_id";

    await expect(attendEventAction(user_id, event_id)).rejects.toThrow(
      "User is already attending this event"
    );
  });
});
