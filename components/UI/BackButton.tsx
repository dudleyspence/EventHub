"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return <Button onPress={goBack}>Go Back</Button>;
}
