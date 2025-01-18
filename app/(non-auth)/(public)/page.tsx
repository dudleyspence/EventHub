import { auth } from "@/auth";

import React from "react";

export default async function LandingPage() {
  const session = await auth();
  return <main></main>;
}
