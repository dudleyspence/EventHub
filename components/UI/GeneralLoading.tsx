import { Spinner } from "@heroui/react";
import React from "react";

export default function GeneralLoading() {
  return (
    <div className="h-[60vh]  flex justify-center items-center">
      <Spinner size="lg" color="warning" />
    </div>
  );
}
