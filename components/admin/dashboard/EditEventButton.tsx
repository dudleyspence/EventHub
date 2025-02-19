"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaEdit } from "react-icons/fa";

export default function EditEventButton({ event_id }: { event_id: string }) {
  const router = useRouter();
  return (
    <Button
      color="warning"
      variant="ghost"
      className="text-black"
      startContent={<FaEdit size={20} />}
      onPress={() => {
        router.push(`/events/edit/${event_id}`);
      }}
    >
      Edit Event
    </Button>
  );
}
