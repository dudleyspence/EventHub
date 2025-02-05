"use client";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { Radio, RadioGroup } from "@heroui/react";
import { Category } from "@prisma/client";
import React, { useEffect, useState } from "react";
import FiltersSkeleton from "../loading/FiltersSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterSidebar({
  category,
}: {
  category: string | undefined;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(true);

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

  function handleCategoryChange(category: string) {
    router.push(
      category === "None" ? `/events` : `/events/category/${category}`
    );
  }

  function handleDateChange(value: string) {
    const params = new URLSearchParams(searchParams);

    const today = new Date();

    const weekFromNow = new Date();
    weekFromNow.setDate(today.getDate() + 7);

    const monthFromNow = new Date();
    monthFromNow.setMonth(today.getMonth() + 1);

    if (value === "week") {
      params.set("startDate", today.toISOString());
      params.set("endDate", weekFromNow.toISOString());
    } else if (value === "month") {
      params.set("startDate", today.toISOString());
      params.set("endDate", monthFromNow.toISOString());
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }

    let newUrl = `/events?${params.toString()}`;
    if (category) {
      newUrl = `/events/category/${category}?${params.toString()}`;
    }
    router.push(newUrl);
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
            value={category || "None"}
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
