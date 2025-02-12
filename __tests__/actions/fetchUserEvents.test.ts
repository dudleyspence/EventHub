import { attendEventAction } from "@/lib/actions/attendEvent";
import { fetchUserEvents } from "@/lib/actions/fetchUserEvents";
import { db } from "@/lib/db";
import { getUserById } from "@/lib/user";
import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("fetchUserEvents", () => {
  beforeEach(async () => {
    const user = {
      id: "user_events_user",
      email: "user_events@test.com",
      name: "TEST USER",
      image: faker.image.avatar(),
      password: "password",
      role: UserRole.USER,
    };
    const pastEvent = {
      title: `back to the past`,
      description: faker.lorem.sentences(1),
      maxCapacity: faker.number.int({ min: 10, max: 100 }),
      totalAttendees: 0,
      image: faker.image.urlLoremFlickr({ category: "nightlife" }),
      date: faker.date.past(),
      userId: "test_id",
      category: "Community",
    };

    const futureEvent = {
      id: "furtureId",
      title: `back to the future`,
      description: faker.lorem.sentences(1),
      maxCapacity: faker.number.int({ min: 10, max: 100 }),
      totalAttendees: 0,
      image: faker.image.urlLoremFlickr({ category: "nightlife" }),
      date: faker.date.future(),
      userId: "test_id",
      category: "Community",
    };

    await db.user.create({ data: user });
    const eventPast = await db.event.create({ data: pastEvent });
    const eventFuture = await db.event.create({ data: futureEvent });
    await attendEventAction("user_events_user", eventPast.id);
    await attendEventAction("user_events_user", eventFuture.id);
  });

  afterEach(async () => {
    await db.user.deleteMany({ where: { id: "user_events_user" } });
    await db.event.deleteMany({ where: { id: "furtureId" } });
    await db.event.deleteMany({ where: { id: "pastId" } });
  });

  describe("Future events", () => {
    it("returns an array", async () => {
      const events = await fetchUserEvents("user_events_user");
      expect(Array.isArray(events)).toBeTruthy();
    });

    it("returns an array of events", async () => {
      const events = await fetchUserEvents("user_events_user");
      expect(events.length).toBeGreaterThan(0);

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

    it("returns an empty array when the user doesnt exist", async () => {
      const events = await fetchUserEvents("no_events_user_id");
      expect(events).toEqual([]);
    });

    it("returns an empty array when the user exists but has no upcoming events", async () => {
      const user = await getUserById("user_events_user");
      expect(user).not.toBeNull();
      await db.event.deleteMany({ where: { id: "furtureId" } });
      const events = await fetchUserEvents("user_events_user");
      expect(events).toEqual([]);
    });
  });

  describe("Historical Events", () => {
    it("returns an array", async () => {
      const events = await fetchUserEvents("user_events_user", true);
      expect(Array.isArray(events)).toBeTruthy();
    });

    it("returns an array of events", async () => {
      const events = await fetchUserEvents("user_events_user", true);
      expect(events.length).toBeGreaterThan(0);
      console.log(events);
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

    it("returns an empty array when the user doesnt exist", async () => {
      const events = await fetchUserEvents("no_events_user_id", true);
      expect(events).toEqual([]);
    });

    it("returns an empty array when the user exists but has no past events", async () => {
      const user = await getUserById("test_id");
      expect(user).not.toBeNull();
      const events = await fetchUserEvents("test_id", true);
      expect(events).toEqual([]);
    });
  });
});
