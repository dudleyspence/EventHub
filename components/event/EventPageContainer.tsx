import { fetchSingleEvent } from "@/actions/fetchSingleEvent";
import React, { useEffect } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EventPageContainer({ params }: PageProps) {
  const { id } = params;

  const event = await fetchSingleEvent(id);

  return <div>EventPageContainer</div>;
}
