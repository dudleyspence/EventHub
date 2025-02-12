"use server";

import { getCategory } from "../category";

export async function fetchCategory(id: string) {
  const category = await getCategory(id);

  return category ? category : undefined;
}
