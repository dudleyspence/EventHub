import { fetchEventsAction } from "@/actions/fetchEvents";
import { describe, expect, it } from "vitest";

// describe("", () => {
//   it("returns an empty array if there isnt upcomming events", async () => {
//     await clearDatabase();
//     onTestFinished(async () => await seed());
//     const events = await fetchEventsAction({});
//     expect(events).toEqual([]);
//   }, 5000);
// });

describe("fetchEvents Invalid Params", () => {
  const invalidParams: Array<[string, any]> = [
    ["invalid orderBy value", { orderBy: "speed" }],
    ["invalid category value", { category: 10 }],
    ["invalid sort value", { sort: "upsideDown" }],
    ["negative page number", { page: -1 }],
    ["zero limit", { limit: 0 }],
    ["invalid startDate", { startDate: "not a date" }],
    ["invalid endDate", { endDate: "not a date" }],
    [
      "invalid startDate and endDate",
      { startDate: "not a date", endDate: "not a date" },
    ],
  ];

  it.each(invalidParams)(
    "returns an error when failing schema validation: %s",
    async (description, params) => {
      await expect(fetchEventsAction(params)).rejects.toThrow(
        "Invalid data request"
      );
    }
  );
});

describe("fetchEvents Valid Params", () => {
  it("should return a list of maximum 10 events when using the default limit", async () => {
    const results = await fetchEventsAction({});
    const events = results.events;

    if (Array.isArray(events)) {
      expect(events.length).toBeLessThanOrEqual(10);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns a list of events using default order by date desc if not given params", async () => {
    const results = await fetchEventsAction({});
    const events = results.events;
    if (Array.isArray(events)) {
      for (let i = 0; i < events.length - 1; i++) {
        const isOrdered = events[i].date >= events[i + 1].date;
        expect(isOrdered).toBe(true);
      }
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("only returns future events when no date is provided", async () => {
    const results = await fetchEventsAction({});
    const events = results.events;

    if (Array.isArray(events)) {
      const today = new Date();

      const isFuture = events.every((event) => event.date > today);

      expect(isFuture).toBe(true);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("successfully searches by category", async () => {
    const results = await fetchEventsAction({ category: "Live Music" });
    const events = results.events;

    if (Array.isArray(events)) {
      const hasCategory = events.every(
        (event) => event.category === "Live Music"
      );
      expect(hasCategory).toBe(true);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("successfully searches by startDate", async () => {
    const testDate = new Date("2025-04-14 00:00:00.000");
    const results = await fetchEventsAction({
      startDate: testDate,
    });
    const events = results.events;

    if (Array.isArray(events)) {
      const hasCorrectDate = events.every((event) => event.date >= testDate);
      expect(hasCorrectDate).toBe(true);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns empty object when no events occur after the given start date", async () => {
    // year 5025
    const testDate = new Date("5025-04-14 00:00:00.000");
    const results = await fetchEventsAction({
      startDate: testDate,
    });
    const events = results.events;

    if (Array.isArray(events)) {
      const hasCorrectDate = events.every((event) => event.date >= testDate);
      expect(hasCorrectDate).toBe(true);

      expect(events).toEqual([]);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("successfully searches by startDate", async () => {
    const testStartDate = new Date("2025-01-14 00:00:00.000");
    const testEndDate = new Date("2030-04-14 00:00:00.000");

    const results = await fetchEventsAction({
      startDate: testStartDate,
      endDate: testEndDate,
    });
    const events = results.events;

    if (Array.isArray(events)) {
      const hasCorrectDate = events.every(
        (event) => testStartDate <= event.date && event.date <= testEndDate
      );
      expect(hasCorrectDate).toBe(true);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns a list of events using asc order by date", async () => {
    const results = await fetchEventsAction({ sort: "asc" });
    const events = results.events;

    if (Array.isArray(events)) {
      for (let i = 0; i < events.length - 1; i++) {
        const isOrdered = events[i].date <= events[i + 1].date;
        expect(isOrdered).toBe(true);
      }
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns a list of events using default desc and order by maxCapacity", async () => {
    const results = await fetchEventsAction({ orderBy: "totalAttendees" });
    const events = results.events;

    if (Array.isArray(events)) {
      for (let i = 0; i < events.length - 1; i++) {
        const isOrdered =
          events[i].totalAttendees >= events[i + 1].totalAttendees;
        expect(isOrdered).toBe(true);
      }
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns a list of events using asc order by maxCapacity", async () => {
    const results = await fetchEventsAction({
      orderBy: "totalAttendees",
      sort: "asc",
    });
    const events = results.events;

    if (Array.isArray(events)) {
      for (let i = 0; i < events.length - 1; i++) {
        const isOrdered =
          events[i].totalAttendees <= events[i + 1].totalAttendees;
        expect(isOrdered).toBe(true);
      }
    } else {
      throw new Error(`Expected an array of events`);
    }
  });
});

// IMPORTANT NOTE
// fetchEvents gets all events from the future and past
// if i set the default start date to todat then the current behaviour is to return only todays events
// need to change this so that default is today
//if someone wants a sigle day then the start day will be that date at 0000
// and the end day will be the same day but the end of the day
