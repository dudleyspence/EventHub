import React from "react";
import logo from "@/public/brand/Logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full max-w-[1280px] bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <Link href="/">
          <Image src={logo} alt="logo-footer" height={30} />
        </Link>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <a
              href="https://www.dudleyspence.com/en"
              target="_blank"
              rel="noreferrer"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#"
              rel="noreferrer"
              target="_blank"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </a>
          </li>
          <li>
            <a
              href="https://github.com/dudleyspence"
              target="_blank"
              rel="noreferrer"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </a>
          </li>
          <a
            href="https://www.dudleyspence.com/en"
            target="_blank"
            rel="noreferrer"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 cursor-pointer"
          >
            Help
          </a>
          <li>
            <a
              rel="noreferrer"
              target="_blank"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <a color="blue-gray" className="text-center font-normal">
        &copy; 2025 EventHub
      </a>
    </footer>
  );
}
