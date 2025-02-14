"use client";
import { fetchCategory } from "@/lib/actions/fetchCategory";
import { Category } from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

export function useCategory() {
  const { category }: { category: string } = useParams();
  const decodedCategory = category ? decodeURIComponent(category) : undefined;

  const [fullCategory, setFullCategory] = React.useState<Category | undefined>(
    undefined
  );

  useEffect(() => {
    if (!decodedCategory) return;
    async function getCategory() {
      const fullCategory = decodedCategory
        ? await fetchCategory(decodedCategory)
        : undefined;
      setFullCategory(fullCategory);
    }
    getCategory();
  }, [decodedCategory]);

  return { category, fullCategory };
}
