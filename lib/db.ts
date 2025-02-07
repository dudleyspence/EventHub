import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// if we save in dev environment it hot reloads so creates a new PrismaClient() each time
//
// therefore we store the client in globalThis which isnt effected by hot reload and then use the same client
