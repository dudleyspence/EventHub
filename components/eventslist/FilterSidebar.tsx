"use client";
import {
  Button,
  Drawer,
  DrawerContent,
  Radio,
  RadioGroup,
  useDisclosure,
} from "@heroui/react";
import React, { useState } from "react";
import FiltersSkeleton from "../loading/FiltersSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { CiFilter } from "react-icons/ci";

export function FilterSidebar({ categories }: { categories: string[] }) {
  return <FilterSidebarLogic categories={categories} />;
}

export function MobileFilterSidebar({ categories }: { categories: string[] }) {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button size="lg" onPress={onOpen} className="text-md font-bold">
        Filters <CiFilter size={20} className="font-bold" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onOpenChange={onOpenChange}
        className="w-[350px]"
      >
        <DrawerContent>
          {() => (
            <div className="pb-10">
              <FilterSidebarLogic categories={categories} />;
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function FilterSidebarLogic({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [date, setDate] = useState("any");
  const [category, setCategory] = useState("all");

  function handleDateChange(value: string) {
    const params = new URLSearchParams(searchParams);
    params.set("date", value);
    //reset page to 1
    params.delete("page");

    if (value === "any") {
      params.delete("date");
    }

    const newUrl = `/events/category/${category}?${params.toString()}`;
    router.push(newUrl);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setDate("any");

    router.push(`/events/category/${value}`);
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
          onValueChange={handleDateChange}
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
