"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
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
import Searchbar from "./Searchbar";

export default function UserNavbar() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <Navbar maxWidth="xl" className="pt-5">
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image alt="website logo" src={logo} height={45} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link
              size="lg"
              color="foreground"
              className="text-lg text-black font-bold"
              href={item.path}
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
      <div className="sm:hidden">
        <Searchbar />
      </div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <NavbarMenuToggle
            aria-label="Open mobile menu"
            className="sm:hidden"
          />
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
            <DropdownItem key="logout" color="danger">
              <Button
                size="sm"
                color="danger"
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
  );
}
