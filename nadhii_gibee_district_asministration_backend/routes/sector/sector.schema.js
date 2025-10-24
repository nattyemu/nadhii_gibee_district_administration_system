import { z } from "zod";

export const createSectorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().optional(),
  image: z.string().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number")
    .optional(),
  email: z.email("Invalid email format").optional(),
  hours: z.string().optional(),
  services: z.array(z.string()).optional(),
  officials: z.array(z.string()).optional(),
  status: z.record(z.any()).optional(),
});

export const updateSectorSchema = createSectorSchema.partial();
