import { CardWrapper } from "@/components/auth/CardWrapper";
import SignInForm from "@/components/auth/SigninForm";
import React from "react";

type SearchParamsType = Promise<{ error: string }>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const params = await searchParams;

  const error =
    params.error === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider!"
      : "";

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      instruction="Log in to your account to continue"
      backButtonQuestion="Need to create an account?"
      backButtonLabel="Sign Up"
      backButtonHref="/signup"
    >
      <SignInForm urlError={error} />
    </CardWrapper>
  );
}
