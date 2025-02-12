import { getCategory } from "@/lib/category";
import { describe, expect, it } from "vitest";

describe("getCategory", () => {
  it("returns an category object", async () => {
    const category = await getCategory("Live Music");
    expect(category).toMatchObject({
      name: expect.any(String),
      image: expect.any(String),
      description: expect.any(String),
    });
  });
  it("returns null if given an invalid category", async () => {
    const category = await getCategory("invalid");
    expect(category).toBeNull();
  });
});
