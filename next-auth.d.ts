import { User, UserRole } from "@prisma/client";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

// Extend the User type to include the role
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface User extends DefaultUser {
    role: UserRole;
  }
}
