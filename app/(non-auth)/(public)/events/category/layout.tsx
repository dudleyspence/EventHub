import CategoryBanner from "@/components/eventslist/CategoryBanner";
import {
  FilterSidebar,
  MobileFilterSidebar,
} from "@/components/eventslist/FilterSidebar";
import { CategoriesContextProvider } from "@/context/CategoriesContext";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import React from "react";

export default async function EventsListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allCategories = await fetchCategories();
  return (
    <CategoriesContextProvider categories={allCategories}>
      <div className="pt-10 w-full">
        <CategoryBanner />
        <div className="w-full flex flex-row gap-5">
          <div className="hidden lg:block lg:w-1/4">
            <FilterSidebar categories={allCategories} />
          </div>
          <div id="event-list" className="w-full lg:w-3/4">
            <div className="w-full flex flex-row justify-end gap-10 px-10 lg:hidden">
              <MobileFilterSidebar categories={allCategories} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </CategoriesContextProvider>
  );
}
