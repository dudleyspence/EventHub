"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SignupSchema } from "@/schemas";

import React, { useState, useTransition } from "react";
import { Icon } from "@iconify/react";

import { Form, Input, Checkbox, Button } from "@nextui-org/react";
import { signup } from "@/actions/signup";

export default function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const { handleSubmit, control } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      tc: false,
    },
  });

  const onSubmit = (data: z.infer<typeof SignupSchema>) => {
    setError("");
    setSuccess("");
    // Handle form submission (e.g., send to an API)
    startTransition(() => {
      signup(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <Form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Input
            isRequired
            isDisabled={isPending}
            {...field}
            label="Name"
            variant="bordered"
            type="text"
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
          />
        )}
      />
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
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <Input
            {...field}
            isRequired
            isDisabled={isPending}
            label="Confirm Password"
            isInvalid={fieldState.invalid}
            variant="bordered"
            errorMessage={fieldState.error?.message}
            type={isConfirmVisible ? "text" : "password"}
            endContent={
              <button type="button" onClick={toggleConfirmVisibility}>
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
      <Controller
        control={control}
        name="tc"
        render={({ field, fieldState }) => (
          <Checkbox
            isRequired
            isInvalid={fieldState.invalid}
            validationBehavior="aria"
            checked={field.value}
            onChange={(checked) => field.onChange(checked)}
          >
            I agree to the terms and conditions
          </Checkbox>
        )}
      />
      <span className="text-danger text-small">{error}</span>
      <span className="text-success text-small">{success}</span>

      <Button
        isDisabled={isPending}
        isLoading={isPending}
        className="w-full"
        color="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}
