"use server";

import { getCategory } from "../categories";

export async function fetchCategory(id: string) {
  const category = await getCategory(id);

  return category ? category : undefined;
}
