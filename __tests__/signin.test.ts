import { describe, it, expect, afterEach, vi } from "vitest";
import { signin } from "@/actions/signin";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SigninSchema } from "@/schemas";
import { z } from "zod";

// https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
// this provided good notes for mocking the prisma client

vi.mock("@/auth", () => ({
  signIn: vi.fn(),
}));

vi.mock("@/lib/user", () => ({
  getUserByEmail: vi.fn(),
}));

type SigninData = z.infer<typeof SigninSchema>;

describe("signin server action", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Schema validation tests", () => {
    it("returns an error if validation fails", async () => {
      const invalidValues: SigninData = { email: "", password: "" };
      const result = await signin(invalidValues);
      expect(result).toEqual({
        error: "Something went wrong please try again",
      });
    });

    it("returns an error if validation succeeds but the user does not exist", async () => {
      const invalidValues: SigninData = {
        email: "test@email.com",
        password: "Password1!",
      };
      const result = await signin(invalidValues);
      expect(result).toEqual({
        error: "Email not registered",
      });
    });
  });

  // describe("Database Interaction", () => {
  //   it("returns an error if validation passes and the user exists but the password is not correct", async () => {
  //     const invalidValues: SigninData = {
  //       email: process.env.ADMINEMAIL as string,
  //       password: "incorrect",
  //     };
  //     const result = await signin(invalidValues);
  //     expect(result).toEqual({
  //       error: "Invalid Credentials",
  //     });
  //   });

  //   it("returns a success if validation passes", async () => {
  //     const invalidValues: SigninData = {
  //       email: process.env.ADMINEMAIL as string,
  //       password: process.env.ADMINPASSWORD as string,
  //     };
  //     const result = await signin(invalidValues);
  //     expect(result).toEqual({ success: "Signed In!" });
  //   });
  // });
});
