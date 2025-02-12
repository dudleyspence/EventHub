import { SignupSchema } from "@/schemas/auth";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { signup } from "@/lib/actions/signup";
import { z } from "zod";

vi.mock("@/lib/user", () => ({
  getUserByEmail: vi.fn(),
  createUser: vi.fn(),
}));

type SignupData = z.infer<typeof SignupSchema>;

import { getUserByEmail } from "@/lib/user";
import { createUser } from "@/lib/user";
import { User } from "@prisma/client";

describe("signup", () => {
  describe("Schema validation tests", () => {
    it("returns an error if validation fails", async () => {
      const invalidValues: SignupData = {
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        tc: false,
      };
      const result = await signup(invalidValues);
      expect(result).toEqual({
        error: "Something went wrong please try again",
      });
    });
  });

  describe("signup mock tests", () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("returns an error if user already exists", async () => {
      const validInput = {
        email: "user@example.com",
        password: "Password123!",
        name: "existingUser",
        confirmPassword: "Password123!",
        tc: true,
      };

      const mockedGetUserByEmail = vi.mocked(getUserByEmail);
      mockedGetUserByEmail.mockResolvedValue({
        email: "user@example.com",
        password: "password123",
        name: "existingUser",
        role: "USER",
        id: "user",
      });

      const result = await signup(validInput);

      expect(result).toEqual({ error: "This email address is already in use" });
    });
    it("returns an error if the createUser function fails", async () => {
      const validInput = {
        email: "user@example.com",
        password: "Password123!",
        name: "existingUser",
        confirmPassword: "Password123!",
        tc: true,
      };

      const mockedGetUserByEmail = vi.mocked(getUserByEmail);
      mockedGetUserByEmail.mockResolvedValue(null);

      const mockedCreateUser = vi.mocked(createUser);
      mockedCreateUser.mockRejectedValue(new Error(""));

      const result = await signup(validInput);

      expect(result).toEqual({
        error: "Something went wrong while trying to signup",
      });
    });

    it("returns an success if the createUser function creates a new user in the database", async () => {
      const validInput = {
        email: "user@example.com",
        password: "Password123!",
        name: "existingUser",
        confirmPassword: "Password123!",
        tc: true,
      };

      const dummyUser: User = {
        id: "user",
        email: "user@example.com",
        emailVerified: new Date(),
        name: "existingUser",
        password: "hashedPassword",
        image: "image.jpg",
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockedGetUserByEmail = vi.mocked(getUserByEmail);
      mockedGetUserByEmail.mockResolvedValue(null);

      const mockedCreateUser = vi.mocked(createUser);
      mockedCreateUser.mockResolvedValue(dummyUser);

      const result = await signup(validInput);

      expect(result).toEqual({
        success: "Signup Complete",
      });
    });
  });
});
