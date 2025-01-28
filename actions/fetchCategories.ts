"use server";

import { getCategories } from "@/data/categories";

export async function fetchCategories() {
  return await getCategories();
}
