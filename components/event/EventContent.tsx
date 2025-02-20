"use client";
import { FormatDateToReadable } from "@/utils/FormatUTCDateReadable";
import { Event } from "@prisma/client";
import React, { useState } from "react";
import AttendanceControls from "./AttendanceControls";
import { Alert } from "@heroui/react";
import Capacity from "./CapacityChart";
import ServerImage from "../UI/ServerImage";
import { useAlert } from "@/context/AlertContext";
import { currentUser } from "@/lib/auth";

export default function EventContent({
  event,
  user,
}: {
  event: Event;
  user: currentUser | undefined;
}) {
  const [attendanceValue, setAttendanceValue] = useState<number>(
    event.totalAttendees
  );

  const { showAlert, setShowAlert, message, color, title, icon } = useAlert();

  return (
    <div className="w-full">
      <Alert
        className={`z-50 w-[95vw] fixed bottom-20 left-1/2 transform -translate-x-1/2 max-w-[500px] ${color === "success" ? "!text-success-800 !bg-success-50" : "!text-danger-800 !bg-danger-50"}`}
        description={message}
        color={color}
        isVisible={showAlert}
        title={title}
        variant="faded"
        onClose={() => setShowAlert(false)}
        icon={icon}
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
            user={user}
          />
        </div>
        <p className="mt-10">{event.description}</p>
      </div>
    </div>
  );
}
