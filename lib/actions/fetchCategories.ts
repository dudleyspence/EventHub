"use server";

import { getCategories } from "@/lib/categories";

export async function fetchCategories() {
  const categories = await getCategories();
  return categories.map((category) => category.name);
}
