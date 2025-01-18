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
} from "@nextui-org/react";
import Image from "next/image";
import logo from "@/public/brand/Logo.png";
import { signOut } from "next-auth/react";

type MenuItem = {
  name: string;
  path: string;
};

export default function PublicNavbar() {
  const menuItems: MenuItem[] = [{ name: "Events", path: "/events" }];

  return (
    <Navbar maxWidth="xl" className="pt-5">
      <NavbarContent>
        <NavbarBrand>
          <Image alt="website logo" src={logo} height={45} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Button as="a" href={item.path} size="lg" color="foreground">
              {item.name}
            </Button>
          </NavbarItem>
        ))}
        <Button as="a" href="/signin">
          Sign In
        </Button>
        <Button as="a" href="/signup">
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
          {menuItems.map((item, index) => (
            <DropdownItem key={index} href={item.path}>
              {item.name}
            </DropdownItem>
          ))}
          <DropdownItem key="logout" color="danger">
            <Button
              size="sm"
              color="danger"
              onPress={() => signOut({ callbackUrl: "/signin" })}
            >
              Sign Out
            </Button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  );
}
