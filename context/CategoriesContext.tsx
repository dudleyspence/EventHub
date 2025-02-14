"use client";

import React, { createContext, useContext } from "react";

const CategoriesContext = createContext<string[] | undefined>([]);

interface CategoriesContextProps {
  categories: string[];
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
