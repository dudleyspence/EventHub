import { seed } from "@/seed/seed";
import { PrismaClient } from "@prisma/client";
import { beforeAll, afterAll } from "vitest";

const prisma = new PrismaClient();

beforeAll(async () => {
  console.log("Seeding test database...");
  await seed(); // clears then seeds the test database
});

afterAll(async () => {
  await prisma.$disconnect();
});
