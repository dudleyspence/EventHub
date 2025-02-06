import { fetchCategories } from "@/lib/actions/fetchCategories";
import { Category } from "@prisma/client";
import { useEffect, useState } from "react";

export function useCategories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category["name"][]>([]);

  useEffect(() => {
    fetchCategories().then((categories) => {
      setCategories(categories);
      setIsLoading(false);
    });
  }, []);

  return { isLoading, categories };
}
