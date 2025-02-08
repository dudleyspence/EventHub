import React from "react";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import Link from "next/link";
import ServerImage from "@/components/UI/ServerImage";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="hidden mb-4 xs:block fixed top-[-250px] right-[-250px] h-[450px] w-[450px]">
        <ServerImage
          isPriority={true}
          alt="orangeGraphic"
          imageUrl="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739046473/EventHubGraphicOrange_a5rqqe.png"
        />
      </div>
      <div className="hidden mb-4 xs:block fixed bottom-[-250px] left-[-250px] h-[700px] w-[700px]">
        <ServerImage
          isPriority={true}
          alt="orangeGraphic"
          imageUrl="https://res.cloudinary.com/dvb1ktpjd/image/upload/v1739046473/EventHubGraphicOrange_a5rqqe.png"
        />
      </div>

      <Link href="/">
        <Image alt="website logo" src={logo} height={45} className="mb-4" />
      </Link>
      {children}
    </div>
  );
}
