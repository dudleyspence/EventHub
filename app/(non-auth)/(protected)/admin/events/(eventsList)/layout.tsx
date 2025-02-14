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
      {children}
    </CategoriesContextProvider>
  );
}
