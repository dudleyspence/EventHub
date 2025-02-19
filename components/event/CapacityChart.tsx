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

  //bg-gradient-to-br from-orange-500 to-yellow-500

  return (
    <Card className="w-[130px] h-full border-none bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
      <CardBody className="justify-center items-center pb-2">
        <h1 className="font-bold text-white">Capacity</h1>
        <CircularProgress
          classNames={{
            svg: "w-24 h-24 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/20",
            value: "text-xl font-semibold text-white",
          }}
          showValueLabel={true}
          strokeWidth={4}
          value={ticketsSold}
        />
      </CardBody>
      <CardFooter className="justify-center items-center pt-0">
        <Chip
          classNames={{
            base: "border-1 border-white",
            content: "text-white text-xs font-semibold",
          }}
          variant="bordered"
        >
          {totalAttendees} Attending
        </Chip>
      </CardFooter>
    </Card>
  );
}
