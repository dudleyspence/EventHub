import { createEventAction } from "@/lib/actions/createEvent";
import { describe, expect, it } from "vitest";

describe("createEvent", () => {
  const exampleEvent = {
    title: "Test Event",
    description: "This is a test event",
    date: new Date(),
    category: "Community",
    image: "http://testimage.com/image.png",
  };

  it("Creates an event when given valid inputs", async () => {
    const response = await createEventAction(exampleEvent, "test_id");

    expect(response).toBeTruthy();
  });
});

describe("createEvent invalid params", () => {
  //   const invalidParams: Array<[string, any]> = [
  //     ["Event names must be at least 3 characters", { title: "o" }],
  //     ["invalid category value", { category: 10 }],
  //     ["invalid sort value", { sort: "upsideDown" }],
  //     ["negative page number", { page: -1 }],
  //     ["zero limit", { limit: 0 }],
  //     ["invalid startDate", { startDate: "not a date" }],
  //     ["invalid endDate", { endDate: "not a date" }],
  //     [
  //       "invalid startDate and endDate",
  //       { startDate: "not a date", endDate: "not a date" },
  //     ],
  //   ];
  //   it.each(invalidParams)(
  //     "returns an error when failing schema validation: %s",
  //     async (description, params) => {
  //       await expect(fetchEventsAction(params)).rejects.toThrow(
  //         "Invalid data request"
  //       );
  //     }
  //   );
});
