import { checkAttendance } from "@/lib/actions/checkAttendance";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { attendEventAction } from "@/lib/actions/attendEvent";
import { removeEventAttendance } from "@/lib/actions/removeEventAttendance";
import { faker } from "@faker-js/faker";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";

describe("removeEventAttendance", () => {
  beforeAll(async () => {
    const user3 = {
      id: "test_id3",
      email: "test3@test.com",
      name: "TEST USER",
      image: faker.image.avatar(),
      password: "password",
      role: UserRole.USER,
    };

    await db.user.create({ data: user3 });

    const event3 = {
      id: "test_id3",
      title: `tester3`,
      description: "test",
      maxCapacity: 800,
      totalAttendees: 0,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuiCC_XChL0O400c2K1RSl89u2XoSZ5m-ysw&s",
      date: new Date("2025-04-16 17:28:14.467"),
      userId: "test_id",
      category: "Community",
    };

    await db.event.create({ data: event3 });
  });

  afterAll(async () => {
    await db.user.deleteMany({ where: { id: "test_id3" } });
    await db.event.deleteMany({ where: { id: "test_id3" } });
  });

  it("throws an error if the user is already not attending the event", async () => {
    await expect(removeEventAttendance("test_id3", "test_id3")).rejects.toThrow(
      "User is not attending the event"
    );
  });

  it("removes the event attendance", async () => {
    await attendEventAction("test_id3", "test_id3");

    const response = await checkAttendance("test_id3", "test_id3");
    expect(response).toBe(true);

    await removeEventAttendance("test_id3", "test_id3");

    const response2 = await checkAttendance("test_id3", "test_id3");
    expect(response2).toBe(false);
  });
});
