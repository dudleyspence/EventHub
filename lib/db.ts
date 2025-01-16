import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// if we save in dev environment it hot reloads so creates a new PrismaClient() each time
//
// therefore we store the client in globalThis which isnt effected by hot reload and then use the same client
