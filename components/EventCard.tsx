import React from "react";
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import Image from "next/image";
import { Event } from "@prisma/client";
import Link from "next/link";

import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";

interface EventCardProps {
  id: string;
  name: string;
  date: Date;
  totalAttendees: number | null;
  image: string;
  category: string | null;
}

export default function EventCard({
  id,
  name,
  date,
  totalAttendees,
  image,
  category,
}: EventCardProps) {
  return (
    <Card className="w-full max-w-[500px] h-[400px] p-4">
      <Link className="w-full h-full" href={`/events/${id}`}>
        <CardHeader className="flex-col gap-2 items-start h-1/3">
          <h3 className="font-bold text-large">{name}</h3>
          <p>{FormatDateToReadable(date)}</p>
          <div className="flex flex-row items-center gap-3">
            {category && (
              <Chip className="text-white bg-slate-700">{category}</Chip>
            )}
            <small className="text-default-500">
              {totalAttendees} Attending
            </small>
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
      </Link>
    </Card>
  );
}
