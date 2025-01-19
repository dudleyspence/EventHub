import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

interface EventCardProps {
  name: string;
  date: string;
  maxCapacity: number;
  remainingCapacity: number;
  image: string;
}

export default function EventCard({
  name,
  date,
  maxCapacity,
  remainingCapacity,
  image,
}: EventCardProps) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{date}</p>
        <small className="text-default-500">
          {remainingCapacity}
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
