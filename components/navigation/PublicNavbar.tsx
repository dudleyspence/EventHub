"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";

type MenuItem = {
  name: string;
  path: string;
};

export default function PublicNavbar() {
  const menuItems: MenuItem[] = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
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
              href={item.path}
              size="lg"
              className="text-lg text-black font-bold"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
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
              <DropdownItem
                className="text-lg font-bold"
                key={index}
                href={item.path}
              >
                {item.name}
              </DropdownItem>
            ))}
            <DropdownItem key="logout" color="danger">
              <Button color="primary" as="a" href="/signin">
                Sign In
              </Button>
              <Button color="primary" as="a" href="/signup">
                Sign Up
              </Button>
            </DropdownItem>
          </>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
}
