"use client";
import React from "react";
import { RotateWords } from "../UI/RotateWords";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import ServerImage from "../UI/ServerImage";

export default function Hero({ categories }: { categories: string[] }) {
  const { data: session } = useSession();

  return (
    <div className="w-full h-[600px] flex flex-col items-end py-10 ">
      <div className="relative w-full h-full overflow-hidden lg:rounded-xl shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <RotateWords text="Events you love..." words={categories} />
        </div>
        <div className="absolute bottom-10 z-10 inset-0 flex flex-row items-end justify-center gap-5 mt-10">
          <Button
            size="lg"
            radius="full"
            variant="solid"
            className="text-xl text-white font-bold bg-pink-800"
            as="a"
            href="/events"
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
        <ServerImage
          isPriority={true}
          imageUrl="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739023224/EventHubHeroImage_ot7umq.jpg"
          alt="hero image"
        />
      </div>
    </div>
  );
}
