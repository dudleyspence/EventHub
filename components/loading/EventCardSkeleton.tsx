"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function EventCardSkeleton() {
  return (
    <Card className="w-full h-[400px] p-4">
      <CardHeader className="flex-col gap-2 items-start h-1/3">
        <h3 className="font-bold text-large bg-gray-200 w-1/2 h-4 animate-pulse rounded"></h3>
        <p className="bg-gray-200 w-1/3 h-3 animate-pulse rounded"></p>
        <div className="flex flex-row items-center gap-3">
          <div className="bg-gray-200 w-16 h-5 animate-pulse rounded"></div>
          <small className="bg-gray-200 w-12 h-3 animate-pulse rounded"></small>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible w-full h-2/3 relative">
        <div className="bg-gray-200 w-full h-full animate-pulse rounded-xl"></div>
      </CardBody>
    </Card>
  );
}
