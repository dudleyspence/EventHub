import React from "react";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import Link from "next/link";
import yellowGraphic from "@/public/graphics/YellowGraphic.png";
import orangeGraphic from "@/public/graphics/OrangeGraphic.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="hidden mb-4 xs:block fixed top-[-250px] right-[-250px] h-[450px] w-[450px]">
        <Image
          className={`object-cover overflow-hidden transition-opacity duration-700 ease-in-out`}
          src={yellowGraphic}
          priority
          fill
          alt="yellowGraphic"
        />
      </div>
      <div className="hidden mb-4 xs:block fixed bottom-[-250px] left-[-250px] h-[700px] w-[700px]">
        <Image
          className={`object-cover overflow-hidden transition-opacity duration-700 ease-in-out`}
          src={orangeGraphic}
          priority
          fill
          alt="orangeGraphic"
        />
      </div>

      <Link href="/">
        <Image alt="website logo" src={logo} height={45} className="mb-4" />
      </Link>
      {children}
    </div>
  );
}
