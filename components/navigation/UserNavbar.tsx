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
} from "@nextui-org/react";

import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import Searchbar from "./Searchbar";
import Link from "next/link";

export default function UserNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events/category/all" },
    { name: "Dashboard", path: "/dashboard" },
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
                color="foreground"
                className="text-lg text-black font-bold"
                href={item.path}
                prefetch={true}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <Searchbar />
          <Button
            size="md"
            color="danger"
            endContent={<FaSignOutAlt size={16} />}
            onPress={() => signOut({ callbackUrl: "/signin" })}
          >
            Sign Out
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
                <DropdownItem key={`${item.name}-${index}`}>
                  <Link prefetch={true} color="foreground" href={item.path}>
                    {item.name}
                  </Link>
                </DropdownItem>
              ))}
              <DropdownItem className="p-0" key="logout" color="danger">
                <Button
                  size="sm"
                  color="danger"
                  className="w-full"
                  endContent={<FaSignOutAlt size={16} />}
                  onPress={() => signOut({ callbackUrl: "/signin" })}
                >
                  Sign Out
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
