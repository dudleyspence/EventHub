"use client";
import { Input } from "@heroui/react";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Searchbar() {
  return (
    <div>
      <Input
        className="w-full "
        placeholder="Search events..."
        variant="flat"
        endContent={
          <CiSearch className="text-black mb-0.5 pointer-events-none flex-shrink-0" />
        }
      />
    </div>
  );
}
