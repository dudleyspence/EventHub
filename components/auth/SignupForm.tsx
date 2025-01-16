"use client";
import React from "react";
import { Icon } from "@iconify/react";

import { Form, Input, Checkbox, Button } from "@nextui-org/react";

export default function SignupForm() {
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [isVisible, setIsVisible] = React.useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const getPasswordError = (value: string) => {
    if (!isPasswordTouched) return null;
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }
    if (errors.password) {
      return errors.password;
    }
    return null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      // set message 'no password entererd'
    }

    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Submit data to the backend API.
  };

  return (
    <Form
      className="flex flex-col gap-3"
      validationBehavior="native"
      validationErrors={errors}
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage={({ validationDetails }) => {
          if (validationDetails.valueMissing) {
            return "Please enter your name";
          }
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
        errorMessage={getPasswordError(password)}
        isInvalid={getPasswordError(password) !== null}
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
        validate={(value) => {
          if (value !== password) {
            return "Your passwords do not match";
          }

          return null;
        }}
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
