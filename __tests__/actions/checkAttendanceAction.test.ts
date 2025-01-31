import { checkAttendance } from "@/actions/checkAttendance";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaClient, UserRole } from "@prisma/client";
import { attendEventAction } from "@/actions/attendEvent";
import { faker } from "@faker-js/faker";

const db = new PrismaClient();

describe("checkAttendance", () => {
  beforeAll(async () => {
    const user = {
      id: "test_id2",
      email: "test@test.com",
      name: "TEST USER",
      image: faker.image.avatar(),
      password: "password",
      role: UserRole.USER,
    };

    await db.user.create({ data: user });

    const event = {
      id: "test_id2",
      title: `tester`,
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
  });

  it("returns false if user is not attending the event", async () => {
    const response = await checkAttendance("test_id2", "test_id2");
    expect(response).toBe(false);
  });

  it("returns true if user is attending the event", async () => {
    await attendEventAction("test_id2", "test_id2");

    const response = await checkAttendance("test_id2", "test_id2");
    expect(response).toBe(true);
  });
});
