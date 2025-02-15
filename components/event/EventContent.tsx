"use client";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import { Event } from "@prisma/client";
import React, { useState } from "react";
import AttendanceControls from "./AttendanceControls";
import { Alert } from "@heroui/react";
import Capacity from "./CapacityChart";
import ServerImage from "../UI/ServerImage";
import { faker } from "@faker-js/faker";

export default function EventContent({ event }: { event: Event }) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [attendanceValue, setAttendanceValue] = useState<number>(
    event.totalAttendees
  );

  console.log(faker.lorem.paragraphs(8));
  return (
    <div className="w-full">
      <Alert
        color="success"
        className="z-50 fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-[500px] !text-success-800 !bg-success-50/95"
        description={`You have successfully signed up to ${event.title}`}
        isVisible={showSuccessAlert}
        title="Sign up Success"
        variant="faded"
        onClose={() => setShowSuccessAlert(false)}
      />
      <div className="mt-5 relative w-full rounded-xl h-[400px]">
        <ServerImage
          imageUrl={event.image}
          alt={event.title}
          isPriority={true}
          style="xl:rounded-xl"
        />
        <div className="absolute bottom-2 right-2">
          {event.maxCapacity && (
            <Capacity
              totalAttendees={attendanceValue}
              maxCapacity={event.maxCapacity}
            />
          )}
        </div>
      </div>
      <div className="p-5 px-4 w-full">
        <div className=" flex flex-col xs:flex-row justify-between gap-5">
          <div>
            <p>{FormatDateToReadable(event.date)}</p>
            <h1 className="my-5 text-3xl font-bold">{event.title}</h1>
          </div>

          <AttendanceControls
            event={event}
            setAttendanceValue={setAttendanceValue}
            setShowSuccessAlert={setShowSuccessAlert}
          />
        </div>
        <p className="mt-10">{event.description}</p>
      </div>
    </div>
  );
}
