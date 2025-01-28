"use client";
import React from "react";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@heroui/react";

interface CapacityProps {
  totalAttendees: number;
  maxCapacity: number;
}

export default function Capacity({
  totalAttendees,
  maxCapacity,
}: CapacityProps) {
  const ticketsSold = Math.round((totalAttendees * 100) / maxCapacity);
  console.log(ticketsSold);

  //bg-gradient-to-br from-violet-500 to-fuchsia-500

  return (
    <Card className="w-[130px] h-full border-none bg-white">
      <CardBody className="justify-center items-center pb-0">
        <CircularProgress
          classNames={{
            svg: "w-20 h-20 drop-shadow-md",
            indicator: "stroke-warning",
            track: "stroke-black/10",
            value: "text-xl font-semibold text-warning",
          }}
          showValueLabel={true}
          strokeWidth={3}
          value={ticketsSold}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-black/30",
            content: "text-black/90 text-xs font-semibold",
          }}
          variant="bordered"
        >
          {totalAttendees} Attending
        </Chip>
      </CardFooter>
    </Card>
  );
}
