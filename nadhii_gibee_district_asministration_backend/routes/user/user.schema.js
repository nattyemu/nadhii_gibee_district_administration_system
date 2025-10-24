import { z } from "zod";
const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = {
  register: z.object({
    firstName: z
      .string()
      .min(2, "First Name must be at least 2 characters")
      .max(42),
    lastName: z
      .string()
      .min(2, "Last Name must be at least 2 characters")
      .max(42),
    email: z.email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(42, "Password must be less than 42 characters long"),
    role: z.enum(["admin", "user"]),
  }),
  delete: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
  }),
  edit: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format"),
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name is too long")
      .regex(nameRegex, "First name must only contain letters and spaces")
      .optional(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name is too long")
      .regex(nameRegex, "Last name must only contain letters and spaces")
      .optional(),
    email: z.string().regex(emailRegex, "Invalid email format").optional(),
    role: z
      .enum(["admin", "user"], {
        errorMap: () => ({ message: "Invalid role" }),
      })
      .optional(),
  }),
  login: z.object({
    email: z
      .email("Invalid email format")
      .min(5, "Email must be at least 5 characters long")
      .max(42, "Email must be less than 42 characters"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long")
      .max(42, "Password must be less than 42 characters"),
  }),

  forgetPassowd: z.object({
    email: z.email().min(5).max(42),
  }),
  confirmOtp: z.object({
    otp: z.string(),
    token: z
      .string({
        required_error: "Token is required",
      })
      .min(1, "Token cannot be empty"),
  }),
  newPassword: z.object({
    token: z
      .string({
        required_error: "Token is required",
      })
      .min(1, "Token cannot be empty"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(42, "Password must be less than 42 characters"),
    cpassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(42, "Password must be less than 42 characters"),
  }),
};
export default userSchema;
