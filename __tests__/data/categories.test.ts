import { getCategories } from "@/lib/categories";
import { describe, expect, it } from "vitest";

describe("getCategories", () => {
  it("returns an array", async () => {
    const categories = await getCategories();
    expect(Array.isArray(categories)).toBeTruthy();
  });
  it("returns an array category objects", async () => {
    const categories = await getCategories();
    categories.forEach((category) => {
      expect(category).toMatchObject({
        name: expect.any(String),
      });
    });
  });
  it("returns at least one category", async () => {
    const categories = await getCategories();
    expect(categories.length).toBeGreaterThan(0);
  });
});
