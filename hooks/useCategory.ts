"use client";
import { useParams } from "next/navigation";

export function useCategory() {
  const { category }: { category: string } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) : undefined;

  const categoryName = decodedCategory !== "all" ? decodedCategory : undefined;

  return categoryName;
}
