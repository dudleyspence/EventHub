"use client";

import { Category } from "@prisma/client";
import React, { createContext, useContext } from "react";

const CategoriesContext = createContext<Category[]>([]);

interface CategoriesContextProps {
  categories: Category[];
  children: React.ReactNode;
}

export function CategoriesContextProvider({
  children,
  categories,
}: CategoriesContextProps) {
  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
