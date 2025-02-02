import { fetchCategories } from "@/lib/actions/fetchCategories";
import { Radio, RadioGroup } from "@heroui/react";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import FiltersSkeleton from "../loading/FiltersSkeleton";

export default function FilterSidebar({ setFilters, filters }) {
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

  function handleCategoryChange(value: string) {
    const updatedFilter = { ...filters, page: 1 };
    delete updatedFilter.category;
    if (value !== "None") {
      updatedFilter.category = value;
    }
    setFilters(updatedFilter);
  }

  function handleDateChange(value: string) {
    const updatedFilter = { ...filters };
    delete updatedFilter.startDate;
    delete updatedFilter.endDate;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);

    const monthFromNow = new Date();
    monthFromNow.setMonth(today.getMonth() + 1);

    if (value === "week") {
      updatedFilter.startDate = today;
      updatedFilter.endDate = weekFromNow;
    } else if (value === "month") {
      updatedFilter.startDate = today;
      updatedFilter.endDate = monthFromNow;
    }

    setFilters(updatedFilter);
  }

  if (isLoading) {
    return <FiltersSkeleton />;
  }

  return (
    <div className="w-full h-full min-h-screen pl-10 pt-10 flex flex-col gap-10">
      <h2 className="font-bold text-3xl">Filters</h2>
      <div>
        <h3 className="font-bold text-xl">Date</h3>
        <RadioGroup
          color="secondary"
          defaultValue="any"
          label="Select a date"
          onValueChange={handleDateChange}
        >
          <Radio value="any">Any</Radio>
          <Radio value="week">This week</Radio>
          <Radio value="month">This month</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3 className="font-bold text-xl">Categories</h3>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <RadioGroup
            color="secondary"
            defaultValue="None"
            label="Select a category"
            onValueChange={handleCategoryChange}
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
