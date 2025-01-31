import { fetchCategories } from "@/actions/fetchCategories";
import { describe, expect, it } from "vitest";

describe("fetchCategories", () => {
  it("returns an array", async () => {
    const categories = await fetchCategories();
    expect(Array.isArray(categories)).toBe(true);
  });

  it("returns at least one category", async () => {
    const categories = await fetchCategories();

    expect(categories.length).toBeGreaterThan(0);
    expect(categories[0]).toMatchObject({ name: expect.any(String) });
  });

  it("each category has the correct format", async () => {
    const categories = await fetchCategories();
    expect(categories[0]).toMatchObject({ name: expect.any(String) });
  });
});
