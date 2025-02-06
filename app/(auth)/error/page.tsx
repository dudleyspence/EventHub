"use client";
import { Button, Card, CardFooter, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex justify-center items-center">
      <ErrorCard />
    </div>
  );
}

function ErrorCard() {
  return (
    <Card className="bg-slate-50 shadow-lg rounded-lg p-5 w-full max-w-md">
      <CardHeader>
        <p>Oops something went wrong!</p>
      </CardHeader>
      <CardFooter>
        <Link href="/signin">
          <Button onPress={() => {}}>Back to login</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
