import { fetchSingleEvent } from "@/actions/fetchSingleEvent";
import { describe, expect, it } from "vitest";
import { Event } from "@prisma/client";

describe("fetchSingleEvent", () => {
  it("returns a signle event when given the event id", async () => {
    const event = await fetchSingleEvent("test_id");
    // makes sure there is a result
    expect(event).toBeDefined();

    expect(event).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      maxCapacity: expect.any(Number),
      totalAttendees: expect.any(Number),
      image: expect.any(String),
      date: expect.any(Date),
      userId: expect.any(String),
      category: expect.any(String),
    });
  });
});
