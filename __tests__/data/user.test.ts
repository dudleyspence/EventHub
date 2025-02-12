import { db } from "@/lib/db";
import { createUser, getUserByEmail, getUserById } from "@/lib/user";
import { User } from "@prisma/client";
import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";

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

describe("createUser", () => {
  beforeEach(async () => {
    await db.user.deleteMany({ where: { email: "tester96@email.com" } });
  });
  afterEach(async () => {
    await db.user.deleteMany({ where: { email: "tester96@email.com" } });
  });

  it("returns a user object", async () => {
    const user = await createUser(
      "tester96@email.com",
      "testPassword",
      "mr dummy"
    );

    expect(user).toMatchObject({
      id: expect.any(String),
      email: expect.any(String),
      emailVerified: null,
      name: expect.any(String),
      password: expect.any(String),
      image: null,
      role: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("returns an error when user already exists", async () => {
    await expect(
      createUser("admin@admin.com", "testPassword", "mr dummy")
    ).rejects.toThrow("Error while creating user");
  });
});
