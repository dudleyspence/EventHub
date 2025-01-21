import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { signin } from "@/actions/signin";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { SigninSchema } from "@/schemas";
import { z } from "zod";

vi.mock("@/data/user", () => ({
  getUserByEmail: vi.fn(),
}));

vi.mock("@/auth", () => ({
  signIn: vi.fn(),
}));

type SigninData = z.infer<typeof SigninSchema>;

describe("signin server action", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns an error if validation fails", async () => {
    const invalidValues: SigninData = { email: "", password: "" };
    const result = await signin(invalidValues);
    expect(result).toEqual({
      error: "Something went wrong please try again",
    });
  });

  it("returns a success if validation passes", async () => {
    const invalidValues: SigninData = {
      email: "testemail@gmail.com",
      password: "Password1!",
    };
    const result = await signin(invalidValues);
    expect(result).toEqual({
      error: "Something went wrong please try again",
    });
  });
});
