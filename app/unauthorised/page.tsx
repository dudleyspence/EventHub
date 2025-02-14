import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-10 text-xl">
      <h1>You are not authorised to view this page</h1>
      <Link className="underline-offset-2 underline" href="/">
        Return to home
      </Link>
    </div>
  );
}
