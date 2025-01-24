import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

interface EventCardProps {
  name: string;
  date: Date;
  maxCapacity: number | null;
  totalAttendees: number | null;
  image: string;
}

export default function EventCard({
  name,
  date,
  maxCapacity,
  totalAttendees,
  image,
}: EventCardProps) {
  console.log(date);
  return (
    <Card className="w-[350px] h-[400px] p-4">
      <CardHeader className="flex-col items-start h-1/3">
        <p className="text-tiny uppercase font-bold">{}</p>
        <small className="text-default-500">
          {totalAttendees}
          {"/"}
          {maxCapacity}
        </small>
        <h4 className="font-bold text-large">{name}</h4>
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
