import { getUserByEmail, getUserById } from "@/data/user";
import { describe, it, expect } from "vitest";

describe("getUserByEmail", () => {
  it("returns null if email doesnt exist", async () => {
    const user = await getUserByEmail("INVALID@INVALID.com");
    expect(user).toBeNull();
  });

  it("returns user if the user with this email exists", async () => {
    const user = await getUserByEmail("test@email.com");
    expect(user).not.toBeNull();
  });
});

describe("getUserById", () => {
  it("returns null if id doesnt exist", async () => {
    const user = await getUserById("INVALID@INVALID.com");

    expect(user).toBeNull();
  });
  it("returns user if user with id exists", async () => {
    const user = await getUserById("test_id");

    expect(user).not.toBeNull();
  });
});
