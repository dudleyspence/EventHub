import { CardWrapper } from "@/components/auth/CardWrapper";
import SignInForm from "@/components/auth/SigninForm";
import React from "react";

export default function page() {
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      instruction="Log in to your account to continue"
      backButtonQuestion="Need to create an account?"
      backButtonLabel="Sign Up"
      backButtonHref="/signup"
    >
      <SignInForm />
    </CardWrapper>
  );
}
