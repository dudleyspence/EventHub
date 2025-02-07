import { fetchCategories } from "@/lib/actions/fetchCategories";
import { describe, expect, it } from "vitest";

describe("fetchCategories", () => {
  it("returns an array", async () => {
    const categories = await fetchCategories();
    expect(Array.isArray(categories)).toBe(true);
  });

  it("returns at least one category", async () => {
    const categories = await fetchCategories();

    expect(categories.length).toBeGreaterThan(0);
  });

  it("each category has the correct format", async () => {
    const categories = await fetchCategories();
    categories.forEach((category) => {
      expect(category).toBeTypeOf("string");
    });
  });
});
