import { z } from "zod";

export const administratorSchema = {
  // CREATE - Register new administrator
  create: z.object({
    name: z
      .string()
      .min(1, "Administrator name is required")
      .max(100, "Name cannot exceed 100 characters")
      .trim(),
    title: z
      .string()
      .min(1, "Administrator title is required")
      .max(200, "Title cannot exceed 200 characters")
      .trim(),
    image: z.string().min(1, "Image path is required").trim(),
    bio: z
      .string()
      .min(1, "Biography is required")
      .max(2000, "Biography cannot exceed 2000 characters")
      .trim(),
    message: z
      .string()
      .min(1, "Administrator message is required")
      .max(1000, "Message cannot exceed 1000 characters")
      .trim(),
    tenure: z
      .string()
      .min(1, "Tenure period is required")
      .max(50, "Tenure cannot exceed 50 characters")
      .trim(),
    email: z
      .email("Please enter a valid email")
      .min(1, "Email is required")
      .trim()
      .toLowerCase(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number")

      .trim(),
    office: z
      .string()
      .min(1, "Office location is required")
      .max(200, "Office location cannot exceed 200 characters")
      .trim(),
    achievements: z
      .array(
        z
          .string()
          .max(500, "Achievement description cannot exceed 500 characters")
          .trim()
      )
      .optional()
      .default([]),
  }),

  // UPDATE - Update administrator
  update: z.object({
    name: z
      .string()
      .min(1, "Administrator name is required")
      .max(100, "Name cannot exceed 100 characters")
      .trim()
      .optional(),
    title: z
      .string()
      .min(1, "Administrator title is required")
      .max(200, "Title cannot exceed 200 characters")
      .trim()
      .optional(),
    image: z.string().min(1, "Image path is required").trim().optional(),
    bio: z
      .string()
      .min(1, "Biography is required")
      .max(2000, "Biography cannot exceed 2000 characters")
      .trim()
      .optional(),
    message: z
      .string()
      .min(1, "Administrator message is required")
      .max(1000, "Message cannot exceed 1000 characters")
      .trim()
      .optional(),
    tenure: z
      .string()
      .min(1, "Tenure period is required")
      .max(50, "Tenure cannot exceed 50 characters")
      .trim()
      .optional(),
    email: z
      .email("Please enter a valid email")
      .min(1, "Email is required")
      .trim()
      .toLowerCase()
      .optional(),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number")

      .trim()
      .optional(),
    office: z
      .string()
      .min(1, "Office location is required")
      .max(200, "Office location cannot exceed 200 characters")
      .trim()
      .optional(),
    achievements: z
      .array(
        z
          .string()
          .max(500, "Achievement description cannot exceed 500 characters")
          .trim()
      )
      .optional(),
  }),

  // GET/DELETE - by ID
  byId: z.object({
    id: z.string().min(1, "Administrator ID is required"),
  }),
};

export default administratorSchema;
