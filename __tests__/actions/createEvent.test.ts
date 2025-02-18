import { createEventAction } from "@/lib/actions/createEvent";
import { getCategories } from "@/lib/categories";
import { db } from "@/lib/db";
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
  const validEvent = {
    title: "Valid Event",
    description: "This is a test event",
    date: new Date(),
    category: "Community",
    image: "http://testimage.com/image.png",
    maxCapacity: 100,
  };

  const invalidParams: Array<[string, any]> = [
    ["Event title too short", { ...validEvent, title: "o" }],
    ["Event title too long", { ...validEvent, title: new String(150) }],
    ["Event title not provided", { ...validEvent, title: undefined }],
    ["Event description too short", { ...validEvent, description: "o" }],
    [
      "Event description too long",
      { ...validEvent, description: new String(5001) },
    ],
    [
      "Event description not provided",
      { ...validEvent, description: undefined },
    ],
    ["Max capacity not valid", { ...validEvent, maxCapacity: null }],
    ["Max capacity too small", { ...validEvent, maxCapacity: 0 }],
    ["Max capacity not an int", { ...validEvent, maxCapacity: 20.5 }],
    ["Image URL not provided", { ...validEvent, image: undefined }],
    ["Image URL not a URL", { ...validEvent, image: "invalid" }],
    [
      "Image URL doesnt start with http...",
      { ...validEvent, image: "www.potato.com" },
    ],
    ["Date not valid", { ...validEvent, date: "invalid" }],
    [
      "Date in string format not date format",
      { ...validEvent, date: "2025-04-16 17:28:14.467" },
    ],
    [
      "Date is in the past",
      { ...validEvent, date: new Date("2015-04-16 17:28:14.467") },
    ],
    ["Category not provided", { ...validEvent, category: undefined }],
  ];
  it.each(invalidParams)(
    "returns an error when failing schema validation: %s",
    async (description, params) => {
      await expect(createEventAction(params, "test_id")).rejects.toThrow(
        "Invalid event data"
      );
    }
  );

  it("throws an error when the category is not from the options", async () => {
    const invalidCategory = "invalid_category";

    const invalid_event = { ...validEvent, category: invalidCategory };
    await expect(createEventAction(invalid_event, "test_id")).rejects.toThrow(
      "Invalid category"
    );
  });

  it("throws an error when the user not valid", async () => {
    const invalid_event = { ...validEvent };
    await expect(
      createEventAction(invalid_event, "incorrect_test_id")
    ).rejects.toThrow("User not found");
  });

  //   it("throws an error when the user is not an admin", async () => {

  //     const user = await db.user.fetchFi

  //     const invalid_event = { ...validEvent };
  //     await expect(
  //       createEventAction(invalid_event, "incorrect_test_id")
  //     ).rejects.toThrow("You do not have permission to create events");
  //   });
});

// export const CreateEventSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Event names must be at least 3 characters")
//     .max(100, "Event names must be less than 100 characters")
//     .nonempty("Please enter a name for this event"),
//   description: z
//     .string()
//     .min(10, "description must be at least 10 characters")
//     .max(1000, "description must not exceed 1000 characters")
//     .nonempty("Please provide a description for this event"),
//   maxCapacity: z
//     .number()
//     .int("This number is invalid")
//     .min(1, "The max capacity of an event must be at least 1")
//     .optional(),
//   image: z.string().url("An image is required"),
//   date: z.date(),
//   category: z.string(),
// });
