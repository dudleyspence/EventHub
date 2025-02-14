"use server";

import { getCategories } from "@/lib/categories";

export async function fetchCategories() {
  return await getCategories();
}
