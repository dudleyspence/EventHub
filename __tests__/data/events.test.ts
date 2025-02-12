import { getEvents } from "@/lib/events";
import { FetchEventsSchema } from "@/schemas/events";
import { describe, expect, it } from "vitest";

describe("fetchEvents Valid Params", () => {
  it("returns an events search object", async () => {
    const filter = {};
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const eventsSearch = await getEvents(validatedFields.data);

    expect(eventsSearch).toMatchObject({
      events: expect.any(Array),
      total: expect.any(Number),
      totalPages: expect.any(Number),
    });
  });

  it("returns a search object with an array of event objects", async () => {
    const filter = {};
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const eventsSearch = await getEvents(validatedFields.data);
    const events = eventsSearch.events;
    events.forEach((event) => {
      expect(event).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        date: expect.any(Date),
        image: expect.any(String),
        maxCapacity: expect.any(Number || undefined),
        totalAttendees: expect.any(Number),
        category: expect.any(String),
      });
    });
  });

  it("should return a list of maximum 10 events when using the default limit", async () => {
    const filter = {};
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
    const events = results.events;

    if (Array.isArray(events)) {
      expect(events.length).toBeLessThanOrEqual(10);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("returns a list of events using default order by date asc if not given params", async () => {
    const filter = {};
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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

  it("only returns future events when no date is provided", async () => {
    const filter = {};
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
    const events = results.events;

    if (Array.isArray(events)) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isFuture = events.every((event) => event.date > today);

      expect(isFuture).toBe(true);
    } else {
      throw new Error(`Expected an array of events`);
    }
  });

  it("successfully searches by category", async () => {
    const filter = { category: "Live Music" };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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
    const filter = {
      startDate: testDate,
    };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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
    const filter = {
      startDate: testDate,
    };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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

    const filter = {
      startDate: testStartDate,
      endDate: testEndDate,
    };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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
    const filter = { sort: "asc" };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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

  it("returns a list of events using default asc and order by maxCapacity", async () => {
    const filter = { orderBy: "totalAttendees" };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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

  it("returns a list of events using asc order by maxCapacity", async () => {
    const filter = {
      orderBy: "totalAttendees",
      sort: "asc",
    };
    const validatedFields = FetchEventsSchema.safeParse(filter);

    if (!validatedFields.success) {
      throw new Error("Test setup failed");
    }

    const results = await getEvents(validatedFields.data);
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


