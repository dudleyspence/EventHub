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
    ["invalid category value", { category: "plastic" }],
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

    if (Array.isArray(results)) {
      expect(results.length).toBeLessThanOrEqual(10);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns a list of events using default order by date desc if not given params", async () => {
    const results = await fetchEventsAction({});
    if (Array.isArray(results)) {
      for (let i = 0; i < results.length - 1; i++) {
        const isOrdered = results[i].date >= results[i + 1].date;
        expect(isOrdered).toBe(true);
      }
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("only returns future events when no date is provided", async () => {
    const results = await fetchEventsAction({});

    if (Array.isArray(results)) {
      const today = new Date();

      const isFuture = results.every((results) => results.date > today);

      expect(isFuture).toBe(true);
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
