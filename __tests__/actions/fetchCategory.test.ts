import { fetchCategory } from "@/lib/actions/fetchCategory";
import { describe, expect, it } from "vitest";

describe("fetchCategory", () => {
  it("returns a category object", async () => {
    const category = await fetchCategory("Live Music");
    expect(category).toMatchObject({
      name: expect.any(String),
      image: expect.any(String),
      description: expect.any(String),
    });
  });

  it("returns undefined if given an invalid category", async () => {
    const category = await fetchCategory("invalid");
    expect(category).toBeUndefined();
  });
});
