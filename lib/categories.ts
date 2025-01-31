import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
export async function getCategories() {
  const categories = await db.category.findMany();
  return categories;
}
