import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import Image from "next/image";
import { Event } from "@prisma/client";

interface EventCardProps {
  name: string;
  date: Date;
  maxCapacity: number | null;
  totalAttendees: number | null;
  image: string;
  category: string | null;
}

export default function EventCard({
  name,
  date,
  maxCapacity,
  totalAttendees,
  image,
  category,
}: EventCardProps) {
  return (
    <Card className="w-[350px] h-[400px] p-4">
      <CardHeader className="flex-col gap-2 items-start h-1/3">
        <h3 className="font-bold text-large">{name}</h3>
        <div className="flex flex-row items-center gap-3">
          <small className="text-default-500">
            {totalAttendees}
            {"/"}
            {maxCapacity}
          </small>
          {category && <Chip>{category}</Chip>}
        </div>
      </CardHeader>
      <CardBody className="overflow-visible w-full h-2/3">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          fill
        />
      </CardBody>
    </Card>
  );
}
