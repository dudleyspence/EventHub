import CreateEventForm from "@/components/admin/createEvent/CreateEventForm";
import React from "react";

export default function page() {
  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl w-full text-left pl-8 mt-10 mb-5">
        Create Event
      </h1>
      <h1 className="font-bold text-xl w-full text-left pl-8 mt-10 mb-5">
        Use the form below to create a new event
      </h1>
      <CreateEventForm />
    </div>
  );
}
