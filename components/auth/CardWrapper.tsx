"use client";
import React from "react";
import { Divider, Link } from "@nextui-org/react";
import { AuthButtons } from "./AuthButtons";
import React from "react";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  instruction: string;
  backButtonQuestion: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export function CardWrapper({
  children,
  headerLabel,
  instruction,
  backButtonQuestion,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) {
  return (
    <div className="w-full max-w-md p-5 xs:p-8 z-10 bg-white rounded-xl xs:shadow-xl">
      <p className="text-xl font-medium">{headerLabel}</p>
      <p className="text-small text-default-500 mb-6">{instruction}</p>
      {children}
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
      <AuthButtons />
      <p className="text-center text-small mt-4">
        {backButtonQuestion}&nbsp;
        <Link href={backButtonHref} size="sm">
          {backButtonLabel}
        </Link>
      </p>
    </div>
  );
}
