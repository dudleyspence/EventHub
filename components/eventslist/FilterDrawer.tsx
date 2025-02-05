import React from "react";
import { Drawer, DrawerContent, Button, useDisclosure } from "@heroui/react";
import FilterSidebar from "./FilterSidebar";
import { CiFilter } from "react-icons/ci";

export default function FilterDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="block lg:hidden lg:w-1/4">
      <Button onPress={onOpen} className="text-md font-bold">
        Filters <CiFilter size={20} className="font-bold" />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onOpenChange={onOpenChange}
        className="w-[350px]"
      >
        <DrawerContent>
          {(onClose) => (
            <div className="pb-10">
              <FilterSidebar />
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
