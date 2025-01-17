import * as z from "zod";

export const SigninSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

// we should limit password minimum length on signup but not signin
// because maybe we will increase this length later so dont want to lockout old users

export const SignupSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must contain at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
    tc: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.tc === true, {
    message: "You must accept the terms and conditions",
    path: ["tc"],
  });
