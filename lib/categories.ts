import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const db = new PrismaClient();

export const getCategories = cache(async () => {
  return await db.category.findMany();
});
