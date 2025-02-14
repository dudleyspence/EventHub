"use client";
import { Radio, RadioGroup } from "@heroui/react";
import React from "react";
import FiltersSkeleton from "../loading/FiltersSkeleton";
import { useRouter } from "next/navigation";
import { useCategories } from "@/context/CategoriesContext";

export interface FilterSidebarProps {
  category: string | undefined;
  date: string;
  handleFilterChange: (params: string, value: string) => void;
}

export default function FilterSidebar({
  category,
  date,
  handleFilterChange,
}: FilterSidebarProps) {
  const router = useRouter();
  const categories = useCategories();

  function handleCategoryChange(category: string) {
    router.push(`/events/category/${category}`);
  }

  if (!categories) {
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
            console.log(value);
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

        <RadioGroup
          color="secondary"
          defaultValue="all"
          value={category}
          label="Select a category"
          onValueChange={handleCategoryChange}
        >
          <Radio value="all">None</Radio>
          {categories.map((category) => (
            <Radio key={category} value={category}>
              {category}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
