import { fetchCategories } from "@/actions/fetchCategories";
import { FetchEventsInput } from "@/types/events";
import { Radio, RadioGroup } from "@heroui/react";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function FilterSidebar({
  setFilters,
}: {
  setFilters: FetchEventsInput;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    async function fetchCategoryList() {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategoryList();
  }, []);

  return (
    <div className="w-full h-full min-h-screen pl-10 pt-10 flex flex-col gap-10">
      <h2 className="font-bold text-3xl">Filters</h2>

      <div>
        <h3 className="font-bold text-xl">Categories</h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <RadioGroup
            color="secondary"
            defaultValue="None"
            label="Select a category"
          >
            <Radio value="None">None</Radio>
            {categories.map((category) => (
              <Radio key={category.name} value={category.name}>
                {category.name}
              </Radio>
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  );
}
