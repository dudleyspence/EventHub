"use client";
import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import { signOut } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import Searchbar from "./Searchbar";

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { name: "Events", path: "/admin/events" },
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Create Event", path: "/admin/events/create" },
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
                size="lg"
                className="text-lg text-black font-bold"
                href={item.path}
              >
                {item.name}
              </Link>
            </NavbarItem>
          ))}
          <Searchbar />

          <Button
            size="sm"
            color="danger"
            endContent={<FaSignOutAlt />}
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
                  <Link color="foreground" href={item.path}>
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
