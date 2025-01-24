import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

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
    <Card className="py-4 w-[350px] h-[400px] m-5">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{}</p>
        <small className="text-default-500">
          {totalAttendees}
          {"/"}
          {maxCapacity}
        </small>
        <h4 className="font-bold text-large">{name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
