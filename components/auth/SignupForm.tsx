"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";

import {
  Form,
  Input,
  Link,
  Checkbox,
  Button,
  Divider,
} from "@nextui-org/react";

export default function SignupForm() {
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const getPasswordError = (value: string) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }

    return null;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form
      className="flex flex-col gap-3"
      validationBehavior="native"
      validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return "Please enter your name";
          }

          return errors.name;
        }}
        label="Name"
        name="name"
        placeholder="Enter your name"
        variant="bordered"
      />

      <Input
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return "Please enter your email";
          }
          if (validationDetails.typeMismatch) {
            return "Please enter a valid email address";
          }
        }}
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
      />
      <Input
        isRequired
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
        errorMessage={isPasswordTouched ? getPasswordError(password) : null}
        isInvalid={isPasswordTouched && getPasswordError(password) !== null}
        label="Password"
        name="password"
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        value={password}
        onValueChange={setPassword}
        onFocus={() => setIsPasswordTouched(true)}
        variant="bordered"
      />

      <Input
        isRequired
        endContent={
          <button type="button" onClick={toggleConfirmVisibility}>
            {isConfirmVisible ? (
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
        errorMessage={getPasswordError(password)}
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm Password"
        type={isConfirmVisible ? "text" : "password"}
        variant="bordered"
      />
      <Checkbox
        isRequired
        className="my-0.5"
        classNames={{
          label: "text-small",
        }}
        isInvalid={!!errors.terms}
        name="terms"
        validationBehavior="aria"
        value="true"
        onValueChange={() =>
          setErrors((prev) => ({ ...prev, terms: undefined }))
        }
      >
        I agree to the terms and conditions
      </Checkbox>

      {errors.terms && (
        <span className="text-danger text-small">{errors.terms}</span>
      )}

      <Button className="w-full" color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
