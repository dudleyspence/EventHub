import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import FilterSidebar from "./FilterSidebar";

export default function FilterDrawer({ setFilters, filters }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="block lg:hidden lg:w-1/4">
      <Button onPress={onOpen}>Filters</Button>
      <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <FilterSidebar setFilters={setFilters} filters={filters} />
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
