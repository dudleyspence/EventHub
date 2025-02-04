import useSearchEvents from "@/hooks/useSearchEvents";
import { Input, Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { events } = useSearchEvents(searchTerm);

  return (
    <div>
      <Autocomplete
        className="w-full "
        placeholder="Search events..."
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
