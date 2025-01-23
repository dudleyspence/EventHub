import { SignupSchema } from "@/schemas/auth";
import { describe, it, expect, afterEach, vi } from "vitest";
import { signup } from "@/actions/signup";
import { z } from "zod";

vi.mock("@/auth", () => ({
  signUp: vi.fn(),
}));

vi.mock("@/lib/user", () => ({
  getUserByEmail: vi.fn(),
}));

type SignupData = z.infer<typeof SignupSchema>;

describe("signup", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

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
});
