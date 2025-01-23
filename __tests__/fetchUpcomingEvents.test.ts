import { fetchUpcomingEvents } from "@/actions/fetchUpcomingEvents";
import { describe, it, expect, afterEach, vi } from "vitest";

describe("FetchUpcomingEvents", () => {
  it("should return a list of maximum 10 events", async () => {
    const events = await fetchUpcomingEvents();
    expect(events.length).toBeLessThanOrEqual(10);
  });
});
