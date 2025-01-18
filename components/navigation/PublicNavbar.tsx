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
import { signOut } from "next-auth/react";
import SignoutButton from "./SignoutButton";

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
            <Link size="lg" color="foreground" href={item.path}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
        <Link href="/signin">
          <Button>Sign In</Button>
        </Link>
        <SignoutButton />
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
            <Link
              key={`${item.name}-${index}`}
              color="foreground"
              href={item.path}
            >
              <DropdownItem>{item.name}</DropdownItem>
            </Link>
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
