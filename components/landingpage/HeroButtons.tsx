"use client";
import { Button } from "@heroui/react";
import React from "react";

export default function HeroButtons({ session }: { session: boolean }) {
  // passing session as props for security of the tokens
  return (
    <div className="w-full h-full flex flex-row items-end justify-center gap-5">
      <Button
        size="lg"
        radius="full"
        variant="solid"
        className="text-xl text-white font-bold bg-pink-800"
        as="a"
        href="/events/category/all"
      >
        Browse Events
      </Button>
      {session ? (
        <Button
          size="lg"
          radius="full"
          variant="solid"
          className="text-xl text-black font-bold bg-amber-200"
          as="a"
          href="/dashboard"
        >
          Dashboard
        </Button>
      ) : (
        <Button
          size="lg"
          radius="full"
          variant="solid"
          className="text-xl text-black font-bold bg-amber-200"
          as="a"
          href="/signup"
        >
          Register
        </Button>
      )}
    </div>
  );
}
