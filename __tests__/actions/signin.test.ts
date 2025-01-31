import { describe, it, expect, afterEach, vi } from "vitest";
import { signin } from "@/lib/actions/signin";

import { SigninSchema } from "@/schemas/auth";
import { z } from "zod";

// https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
// this provided good notes for mocking the prisma client

type SigninData = z.infer<typeof SigninSchema>;

describe("signin", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Schema validation tests", () => {
    vi.mock("@/auth", () => ({
      signIn: vi.fn(),
    }));

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
});
