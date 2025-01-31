import { checkAttendance } from "@/actions/checkAttendance";
import { describe, expect, it } from "vitest";
import { attendEventAction } from "@/actions/attendEvent";
import { removeEventAttendance } from "@/actions/removeEventAttendance";

describe("checkAttendance", () => {
  it("removes the event attendance", async () => {
    await attendEventAction("test_id2", "test_id2");

    const response = await checkAttendance("test_id2", "test_id2");
    expect(response).toBe(true);

    await removeEventAttendance("test_id2", "test_id2");

    await attendEventAction("test_id2", "test_id2");

    const response2 = await checkAttendance("test_id2", "test_id2");
    expect(response2).toBe(false);
  });

  // test retrurns error if the user already isnt attending the event
});
