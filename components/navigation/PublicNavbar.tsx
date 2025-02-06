"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import Searchbar from "./Searchbar";

import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

type MenuItem = {
  name: string;
  path: string;
};

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems: MenuItem[] = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <Navbar maxWidth="xl" className="pt-5">
        <NavbarContent>
          <NavbarBrand>
            <Link href="/">
              <Image alt="website logo" src={logo} height={45} />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden lg:flex gap-6" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.name}>
              <Link
                href={item.path}
                size="lg"
                className="text-lg text-black font-bold"
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <Searchbar />

          <Button
            className="text-black"
            variant="flat"
            color="primary"
            as="a"
            href="/signin"
          >
            Sign In
          </Button>
          <Button
            variant="flat"
            className="text-black"
            color="primary"
            as="a"
            href="/signup"
          >
            Sign Up
          </Button>
        </NavbarContent>
        <div className="hidden xs:block lg:hidden">
          <Searchbar />
        </div>
        <Dropdown
          placement="bottom-end"
          onOpenChange={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <DropdownTrigger className="lg:hidden">
            <Button isIconOnly className="bg-transparent">
              {isMenuOpen ? <RxCross1 size={25} /> : <IoIosMenu size={30} />}
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Mobile Navigation" variant="flat">
            <>
              {menuItems.map((item, index) => (
                <DropdownItem
                  className="font-bold text-center"
                  key={index}
                  href={item.path}
                >
                  {item.name}
                </DropdownItem>
              ))}
              <DropdownItem key="signin" color="primary">
                <Button
                  size="sm"
                  color="primary"
                  variant="flat"
                  as="a"
                  href="/signin"
                  className="w-full"
                >
                  Sign In
                </Button>
              </DropdownItem>
              <DropdownItem key="signup" color="primary">
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  as="a"
                  href="/signup"
                  className="w-full"
                >
                  Sign Up
                </Button>
              </DropdownItem>
            </>
          </DropdownMenu>
        </Dropdown>
      </Navbar>
      <div className="w-full px-5 mt-5 xs:hidden">
        <Searchbar />
      </div>
    </div>
  );
}
