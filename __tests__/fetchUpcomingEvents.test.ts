import { fetchUpcomingEvents } from "@/actions/fetchUpcomingEvents";
import { describe, it, expect } from "vitest";

describe("FetchUpcomingEvents", () => {
  it("should return a list of maximum 10 events", async () => {
    const events = await fetchUpcomingEvents();
    expect(events.length).toBeLessThanOrEqual(10);
  });
  it("only returns future events", async () => {
    const events = await fetchUpcomingEvents();
    const today = new Date();

    const isFuture = events.every((event) => event.date > today);

    expect(isFuture).toBe(true);
  });
  it("returns the events in order with nearest events first", async () => {
    const events = await fetchUpcomingEvents();
    for (let i = 0; i < events.length - 1; i++) {
      const isOrdered = events[i].date >= events[i + 1].date;
      expect(isOrdered).toBe(true);
    }
  });
});
