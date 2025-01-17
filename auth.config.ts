import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { SigninSchema } from "@/schemas";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      async authorize(credentials) {
        const validatedFields = SigninSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          // if user signed up with github or google the wont have a password
          // so they cant be accepted through credentials provider
          if (!user || !user.password) return undefined;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;

          return undefined;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
} satisfies NextAuthConfig;
