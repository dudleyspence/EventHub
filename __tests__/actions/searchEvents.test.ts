import { searchEvents } from "@/lib/actions/searchEvents";
import { describe, expect, it } from "vitest";

describe("searchEvents", () => {
  it("should return an empty array when a search is performed with less than 2 characters", async () => {
    const searchResults = await searchEvents("B");
    expect(searchResults).toEqual([]);
  });
  it("should return an array when a search is performed", async () => {
    const searchResults = await searchEvents("Bi");
    expect(Array.isArray(searchResults)).toBe(true);
  });
  it("should return an array with matching events", async () => {
    const searchResults = await searchEvents("Billie");
    console.log(searchResults, "<<< results");
    expect(searchResults[0].title).toBe("Billie Eilish Live");
  });
  it("should return an array with matching events", async () => {
    const searchResults = await searchEvents("Bi");
    searchResults.forEach((result) => {
      expect(result).toMatchObject({
        title: expect.any(String),
        id: expect.any(String),
      });
    });
  });
  it("should return an empty array when a non-existent event is searched", async () => {
    const searchResults = await searchEvents(
      "fpnefoiwenfkjnsxkjxxwdknqwdnqwdqdwx"
    );
    expect(searchResults).toEqual([]);
  });
  it("should return an empty array when a search is performed with a null search term", async () => {
    const searchResults = await searchEvents(null as any);
    expect(searchResults).toEqual([]);
  });
  it("should return an empty array when a search is performed with an undefined search term", async () => {
    const searchResults = await searchEvents(undefined as any);
    expect(searchResults).toEqual([]);
  });
  it("should return an empty array when a search is performed with an empty search term", async () => {
    const searchResults = await searchEvents("");
    expect(searchResults).toEqual([]);
  });
  it("should return an empty array when a search is performed with a search term containing only whitespace", async () => {
    const searchResults = await searchEvents("   ");
    expect(searchResults).toEqual([]);
  });
  it("should return an empty array when a search is performed with a search term containing only special characters", async () => {
    const searchResults = await searchEvents("!@#$%^&*()_+");
    expect(searchResults).toEqual([]);
  });
});
