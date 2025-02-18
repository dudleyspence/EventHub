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
      /*
      Docs for refresh token rotation here
       https://authjs.dev/guides/refresh-token-rotation?framework=


       IMPORTANT: user has a one-to-many relationship with Account meaning they can be a Github user
       but also have a google account linked!
      */

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      // checks if user is a google auth user
      const googleAccount = await db.account.findFirst({
        where: { userId: token.sub, provider: "google" },
      });

      // if user a google account adds the access tokens etc to the jwt token so they can be added to the session token
      if (googleAccount) {
        token.googleAccessToken = googleAccount.access_token;
        token.googleRefreshToken = googleAccount.refresh_token;
        token.googleTokenExpiresAt = googleAccount.expires_at;
      }

      if (
        token.googleAccessToken &&
        token.googleTokenExpiresAt &&
        Date.now() >= token.googleTokenExpiresAt * 1000
      ) {
        if (!token.googleRefreshToken) {
          throw new Error("Missing refresh_token");
        }

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.googleRefreshToken,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          // Update the token with the new access token details
          token.googleAccessToken = newTokens.access_token;
          token.googleTokenExpiresAt = Math.floor(
            Date.now() / 1000 + newTokens.expires_in
          );
          // Preserve the refresh token if a new one is not provided
          token.googleRefreshToken = newTokens.refresh_token
            ? newTokens.refresh_token
            : token.googleRefreshToken;
        } catch (error) {
          console.error("Error refreshing access_token", error);
          token.error = "RefreshTokenError";
        }
      }

      return token;
    },
  },
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db) as Adapter,
  ...authConfig,
});
