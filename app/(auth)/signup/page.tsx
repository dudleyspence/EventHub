import { CardWrapper } from "@/components/auth/CardWrapper";
import SignUpForm from "@/components/auth/SignupForm";
import React from "react";

export default function page() {
  return (
    <CardWrapper
      headerLabel="Sign Up!"
      instruction=""
      backButtonQuestion="Already have an account?"
      backButtonLabel="Sign In"
      backButtonHref="/signin"
    >
      <SignUpForm />
    </CardWrapper>
  );
}
