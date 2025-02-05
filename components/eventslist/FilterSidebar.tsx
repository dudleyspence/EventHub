"use client";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { Radio, RadioGroup } from "@heroui/react";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import FiltersSkeleton from "../loading/FiltersSkeleton";
import { useRouter } from "next/navigation";

export default function FilterSidebar({
  category,
  date,
  handleFilterChange,
}: {
  category: string | undefined;
  date: string;
  handleFilterChange: (params: string, value: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);

    async function fetchCategoryList() {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch categories");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategoryList();
  }, []);

  function handleCategoryChange(category: string) {
    router.push(
      category === "None" ? `/events` : `/events/category/${category}`
    );
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
          value={date}
          onValueChange={(value) => {
            handleFilterChange("date", value);
          }}
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
            value={category || "None"}
            label="Select a category"
            onValueChange={handleCategoryChange}
          >
            <Radio value="None">None</Radio>
            {categories.map((category) => (
              <Radio key={category} value={category}>
                {category}
              </Radio>
            ))}
          </RadioGroup>
        )}
      </div>
    </div>
  );
}
