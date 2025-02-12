import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function getCategory(id: string) {
  const category = await db.category.findUnique({
    where: {
      name: id,
    },
  });

  return category;
}
