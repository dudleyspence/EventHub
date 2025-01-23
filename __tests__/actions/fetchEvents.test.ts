import { fetchEventsAction } from "@/actions/fetchEvents";
import { describe, expect, it } from "vitest";

type FetchEventsParams = {
  orderBy?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
};

describe("fetchEvents Invalid Params", () => {
  const invalidParams: Array<[string, FetchEventsParams]> = [
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
      const results = await fetchEventsAction(params);
      expect(results).toEqual({ error: "Invalid data request" });
    }
  );
});

describe("fetchEvents", () => {
  it("returns a list of 10 events", async () => {
    const results = await fetchEventsAction({});

    if (Array.isArray(results)) {
      expect(results.length).toBe(10);
    } else {
      throw new Error(`Expected an array of events: ${results.error}`);
    }
  });

  it("returns a list of events using default order by date desc", async () => {
    const results = await fetchEventsAction({});

    if (Array.isArray(results)) {
      expect(results.length).toBe(10);
    } else {
      throw new Error(`Expected an array of events: ${results.error}`);
    }
  });
});

// IMPORTANT NOTE
// fetchEvents gets all events from the future and past
// if i set the default start date to todat then the current behaviour is to return only todays events
// need to change this so that default is today
//if someone wants a sigle day then the start day will be that date at 0000
// and the end day will be the same day but the end of the day
