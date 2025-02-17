import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import { getUserById } from "./lib/user";
import { JWT } from "next-auth/jwt";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/signin",
    error: "/error",
  },
  events: {},
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.googleAccessToken) {
        session.user.googleToken = token.googleAccessToken;
        session.user.googleRefreshToken = token.googleRefreshToken;
        session.user.googleTokenExpiresAt = token.googleTokenExpiresAt;
      }

      return session;
    },
    async jwt({ token }: { token: JWT }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      // checks if user is a google auth user
      const googleAccount = await db.account.findFirst({
        where: { userId: token.sub, provider: "google" },
      });

      // if userr a google account adds the access tokens etc to the jwt token so they can be added to the session token
      if (googleAccount) {
        token.googleAccessToken = googleAccount.access_token;
        token.googleRefreshToken = googleAccount.refresh_token;
        token.googleTokenExpiresAt = googleAccount.expires_at;
      }

      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db) as Adapter,
  ...authConfig,
});
