import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { PrismaClient } from "@prisma/client";
import { checkAttendance } from "@/lib/actions/checkAttendance";
import { removeEvent } from "@/lib/actions/removeEvent";
import { attendEventAction } from "@/lib/actions/attendEvent";
import { db } from "@/lib/db";

describe("removeEvent", () => {
  beforeAll(async () => {
    const user = {
      id: "remove_event_user",
      email: "remove_event@test.com",
      name: "TEST USER",
      image: faker.image.avatar(),
      password: "password",
      role: UserRole.USER,
    };

    const admin = {
      id: "remove_event_admin",
      email: "remove_event_admin@test.com",
      name: "TEST ADMIN",
      image: faker.image.avatar(),
      password: "password",
      role: UserRole.ADMIN,
    };

    await db.user.create({ data: user });
    await db.user.create({ data: admin });

    const event = {
      id: "remove_event",
      title: `removed event`,
      description: "test",
      maxCapacity: 800,
      totalAttendees: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiCC_XChL0O400c2K1RSl89u2XoSZ5m-ysw&s",
      date: new Date("2025-04-16 17:28:14.467"),
      userId: "test_id",
      category: "Community",
    };

    await db.event.create({ data: event });

    await attendEventAction("test_id", "remove_event");

    const confirmedAttendance = await checkAttendance(
      "test_id",
      "remove_event"
    );
    expect(confirmedAttendance).toBeTruthy();
  });

  afterAll(async () => {
    await db.user.delete({
      where: {
        id: "remove_event_user",
      },
    });
    await db.user.delete({
      where: {
        id: "remove_event_admin",
      },
    });
  });

  it("throws an error if the user is not an ADMIN", async () => {
    await expect(
      removeEvent("remove_event_user", "remove_event")
    ).rejects.toThrow("You do not have permission to delete events");
  });

  it("throws an error id the user is not an ADMIN", async () => {
    await expect(removeEvent("incorrect", "remove_event")).rejects.toThrow(
      "User not found"
    );
  });

  it("deletes an event", async () => {
    await removeEvent("remove_event_admin", "remove_event");

    const eventExists = await db.event.findUnique({
      where: { id: "remove_event" },
    });
    expect(eventExists).toBeNull();
  });

  it("Cascades the deletion to remove the event attendances", async () => {
    const eventAttendances = await checkAttendance("test_id", "remove_event");

    expect(eventAttendances).toBeFalsy();
  });

  it("throws an error if the event doesnt exist", async () => {
    await expect(
      removeEvent("remove_event_admin", "remove_event")
    ).rejects.toThrow("Event not found");
  });
});
