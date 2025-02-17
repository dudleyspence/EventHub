import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  googleToken?: string | null;
  googleRefreshToken?: string | null;
  googleTokenExpiresAt?: number | null;
};

// Extend the User type to include the role
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    googleAccessToken?: string | null;
    googleRefreshToken?: string | null;
    googleTokenExpiresAt?: number | null;
  }
}
