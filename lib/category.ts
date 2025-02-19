import { db } from "./db";

export async function getCategory(id: string) {
  const category = await db.category.findUnique({
    where: {
      name: id,
    },
  });

  return category;
}
