"use client";
import React from "react";
import { CircularProgress, Card, CardBody, CardFooter } from "@heroui/react";

interface CapacityProps {
  totalAttendees: number;
  maxCapacity: number;
}

export default function Capacity({
  totalAttendees,
  maxCapacity,
}: CapacityProps) {
  const ticketsSold = Math.round((totalAttendees * 100) / maxCapacity);

  return (
    <Card className="w-[130px] h-full border-none bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
      <CardBody className="justify-center items-center pb-2 overflow-hidden">
        <h1 className="font-bold text-white">Capacity</h1>
        <CircularProgress
          classNames={{
            svg: "w-[90px] h-[90px] drop-shadow-md",
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
        <p className="text-white text-xs font-semibold">
          {totalAttendees} Attending
        </p>
      </CardFooter>
    </Card>
  );
}
