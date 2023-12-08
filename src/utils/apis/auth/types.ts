import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Invalid email"),
  password: z
    .string()
    .min(1, { message: "Password is required, please enter your password" }),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Full name is required" }).max(50),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Invalid email"),
    password: z.string().min(1, { message: "Password is required" }),
    repassword: z.string().min(1, { message: "Retype password is required" }),
  })
  .refine((data) => data.password === data.repassword, {
    path: ["repassword"],
    message: "Password don't match",
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
