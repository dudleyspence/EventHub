import { describe, it, expect, vi, beforeEach, Mock } from "vitest";

vi.mock("@/auth", () => ({
  signIn: vi.fn(),
}));

vi.mock("@/lib/user", () => ({
  getUserByEmail: vi.fn(),
}));

import { signin } from "@/lib/actions/signin";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/user";

import { SigninSchema } from "@/schemas/auth";
import { z } from "zod";
import { AuthError } from "next-auth";

// https://www.prisma.io/blog/testing-series-1-8eRB5p0Y8o
// thisprovided good notes for mocking the prisma client

type SigninData = z.infer<typeof SigninSchema>;

describe("signin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("returns an error if validation fails", async () => {
    const invalidValues: SigninData = { email: "", password: "" };
    const result = await signin(invalidValues);
    expect(result).toEqual({
      error: "Something went wrong please try again",
    });
    expect(getUserByEmail).not.toHaveBeenCalled();
    expect(signIn).not.toHaveBeenCalled();
  });

  it("should return error if email is not registered", async () => {
    // valid input but not registered
    const validInput = { email: "user@example.com", password: "password123" };

    const mockedGetUserByEmail = vi.mocked(getUserByEmail);
    mockedGetUserByEmail.mockResolvedValue(null);

    const result = await signin(validInput);

    expect(getUserByEmail).toHaveBeenCalledWith(validInput.email);
    expect(result).toEqual({ error: "Email not registered" });
    expect(signIn).not.toHaveBeenCalled();
  });

  it("should return success message when sign in successful", async () => {
    // valid input but not registered
    const validInput = { email: "user@example.com", password: "password123" };

    const mockedGetUserByEmail = vi.mocked(getUserByEmail);
    mockedGetUserByEmail.mockResolvedValue({
      ...validInput,
      role: "USER",
      id: "user",
      name: "username",
    });

    const result = await signin(validInput);

    expect(getUserByEmail).toHaveBeenCalledWith(validInput.email);
    expect(signIn).toHaveBeenCalled();
    expect(result).toEqual({ success: "Signed In!" });
  });
  it("should return invalid credentials if password is incorrect but valid", async () => {
    const validInput = { email: "user@example.com", password: "password123" };

    const mockedGetUserByEmail = vi.mocked(getUserByEmail);
    mockedGetUserByEmail.mockResolvedValue({
      ...validInput,
      role: "USER",
      id: "user",
      name: "username",
    });

    const authError = new AuthError("Invalid credentials");
    authError.type = "CredentialsSignin";

    const mockedSignIn = vi.mocked(signIn);
    mockedSignIn.mockRejectedValue(authError);

    const result = await signin(validInput);

    expect(getUserByEmail).toHaveBeenCalledWith(validInput.email);
    expect(signIn).toHaveBeenCalled();
    expect(result).toEqual({ error: "Invalid Credentials" });
  });

  it("should return Something went wrong if signIn fails for a reason that is not incorrect credentails", async () => {
    const validInput = { email: "user@example.com", password: "password123" };

    const mockedGetUserByEmail = vi.mocked(getUserByEmail);
    mockedGetUserByEmail.mockResolvedValue({
      ...validInput,
      role: "USER",
      id: "user",
      name: "username",
    });

    const authError = new AuthError("Invalid credentials");

    const mockedSignIn = vi.mocked(signIn);
    mockedSignIn.mockRejectedValue(authError);

    const result = await signin(validInput);

    expect(getUserByEmail).toHaveBeenCalledWith(validInput.email);
    expect(signIn).toHaveBeenCalled();
    expect(result).toEqual({ error: "Something went wrong" });
  });
});
