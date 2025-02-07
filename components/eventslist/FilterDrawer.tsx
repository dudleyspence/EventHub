import React from "react";
import { Drawer, DrawerContent, Button, useDisclosure } from "@heroui/react";
import FilterSidebar, { FilterSidebarProps } from "./FilterSidebar";
import { CiFilter } from "react-icons/ci";

export default function FilterDrawer({
  category,
  date,
  handleFilterChange,
  categories,
}: FilterSidebarProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="block lg:hidden lg:w-1/4">
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
              <FilterSidebar
                category={category}
                categories={categories}
                date={date}
                handleFilterChange={handleFilterChange}
              />
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
