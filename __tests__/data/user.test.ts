import { getUserByEmail, getUserById } from "@/lib/user";
import { describe, it, expect } from "vitest";

describe("getUserByEmail", () => {
  it("returns null if email doesnt exist", async () => {
    const user = await getUserByEmail("INVALID@INVALID.com");
    expect(user).toBeNull();
  });

  it("returns a result if the user with this email exists", async () => {
    const user = await getUserByEmail("admin@admin.com");
    expect(user).not.toBeNull();
  });

  it("returns a user object", async () => {
    const user = await getUserByEmail("admin@admin.com");
    expect(user).toMatchObject({
      email: "admin@admin.com",
      name: expect.any(String),
      id: expect.any(String),
      role: expect.any(String),
    });
  });
});

describe("getUserById", () => {
  it("returns null if id doesnt exist", async () => {
    const user = await getUserById("INVALID@INVALID.com");

    expect(user).toBeNull();
  });
  it("returns result if user with id exists", async () => {
    const user = await getUserById("test_id");

    expect(user).not.toBeNull();
  });
  it("returns a user object", async () => {
    const user = await getUserById("test_id");
    expect(user).toMatchObject({
      email: "admin@admin.com",
      name: expect.any(String),
      id: expect.any(String),
      role: expect.any(String),
    });
  });
});
