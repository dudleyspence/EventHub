import { Select, SelectItem } from "@heroui/react";
import React from "react";

export default function SortEvents({
  handleFilterChange,
  sort,
}: {
  handleFilterChange: (params: string, value: string) => void;
  sort: string;
}) {
  return (
    <Select
      size="sm"
      value={sort}
      className="max-w-[150px]"
      label="Order by:"
      variant="faded"
      onChange={(event) => handleFilterChange("sort", event.target.value)}
      radius="lg"
    >
      <SelectItem key="earliest">Earliest First</SelectItem>
      <SelectItem key="latest">Latest First</SelectItem>
      <SelectItem key="highestAttendance">Highest Attendance</SelectItem>
      <SelectItem key="lowestAttendance">Lowest Attendance</SelectItem>
    </Select>
  );
}
