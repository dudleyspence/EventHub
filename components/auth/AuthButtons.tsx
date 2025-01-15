"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";

export function AuthButtons() {
  return (
    <div className="flex flex-col gap-2">
      <Button
        startContent={<Icon icon="flat-color-icons:google" width={24} />}
        variant="bordered"
      >
        Continue with Google
      </Button>
      <Button
        onPress={() => signIn("github", { redirectTo: "/home" })}
        startContent={
          <Icon className="text-default-500" icon="fe:github" width={24} />
        }
        variant="bordered"
      >
        Continue with Github
      </Button>
    </div>
  );
}
