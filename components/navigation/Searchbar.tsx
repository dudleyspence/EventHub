"use client";
import useSearchEvents from "@/hooks/useSearchEvents";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { useRouter } from "next/navigation";
import React, { Key } from "react";
import { CiSearch } from "react-icons/ci";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const { events } = useSearchEvents(searchTerm);

  function handleSearchSelect(key: Key | null) {
    if (key === null) return;
    router.push(`/events/${key}`);
  }

  return (
    <div>
      <Autocomplete
        className="w-full "
        placeholder="Search events..."
        onSelectionChange={handleSearchSelect}
        value={searchTerm}
        onInputChange={(value) => {
          setSearchTerm(value);
        }}
        variant="flat"
        endContent={
          <CiSearch className="text-black mb-0.5 pointer-events-none flex-shrink-0" />
        }
      >
        {events.map((event) => (
          <AutocompleteItem key={event.id}>{event.title}</AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
}
