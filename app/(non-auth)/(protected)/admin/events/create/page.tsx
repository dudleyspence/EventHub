import CreateEventForm from "@/components/admin/createEvent/CreateEventForm";
import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl w-full text-center mt-10 mb-5">
        Create Event
      </h1>
      <CreateEventForm />
    </div>
  );
}
