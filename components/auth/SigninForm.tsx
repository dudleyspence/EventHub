"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SigninSchema } from "@/schemas/auth";

import React, { useState, useTransition } from "react";
import { Button, Input, Checkbox, Link, Form } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { signin } from "@/actions/signin";
import { useSearchParams } from "next/navigation";

export default function SigninForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with a different provider!"
      : "";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const { handleSubmit, control } = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof SigninSchema>) => {
    setError("");
    setSuccess("");
    // Handle form submission (e.g., send to an API)
    startTransition(() => {
      signin(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Input
            isRequired
            isDisabled={isPending}
            {...field}
            label="Email"
            variant="bordered"
            type="email"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            isDisabled={isPending}
            label="Password"
            isInvalid={fieldState.invalid}
            variant="bordered"
            errorMessage={fieldState.error?.message}
            type={isVisible ? "text" : "password"}
            endContent={
              <button type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-closed-linear"
                  />
                ) : (
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon="solar:eye-bold"
                  />
                )}
              </button>
            }
          />
        )}
      />
      <div className="flex w-full items-center justify-between px-1 py-2">
        <Checkbox name="remember" size="sm">
          Remember me
        </Checkbox>
        <Link className="text-default-500" href="#" size="sm">
          Forgot password?
        </Link>
      </div>

      <span className="text-danger text-small">{error || urlError}</span>
      <span className="text-success text-small">{success}</span>

      <Button
        isDisabled={isPending}
        isLoading={isPending}
        className="w-full"
        color="primary"
        type="submit"
      >
        Sign In
      </Button>
    </Form>
  );
}
