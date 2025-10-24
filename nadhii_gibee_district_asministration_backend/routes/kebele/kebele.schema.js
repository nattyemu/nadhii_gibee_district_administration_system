import { z } from "zod";

export const createKebeleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(["Rural Kebele", "City Kebele"], {
    message: "Type must be either 'Rural Kebele' or 'City Kebele'",
  }),
  population: z.string().optional(),
  area: z.string().optional(),
  elevation: z.string().optional(),
  image: z.url().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  contact: z
    .object({
      administrator: z.string().optional(),
      phone: z.string().optional(),
      email: z
        .string()
        .email({ message: "Invalid email format" })
        .optional()
        .or(z.literal("")),
    })
    .optional(),
  status: z
    .object({
      schools: z.number().optional(),
      healthCenters: z.number().optional(),
      roads: z.string().optional(),
      developmentIndex: z
        .enum(["Low", "Medium", "High", "Very High"])
        .optional(),
    })
    .optional(),
});

export const updateKebeleSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  type: z.enum(["Rural Kebele", "City Kebele"]).optional(),
  population: z.string().optional(),
  area: z.string().optional(),
  elevation: z.string().optional(),
  image: z.url().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).optional(),
  contact: z
    .object({
      administrator: z.string().optional(),
      phone: z.string().optional(),
      email: z
        .string()
        .email({ message: "Invalid email format" })
        .optional()
        .or(z.literal("")),
    })
    .optional(),
  status: z
    .object({
      schools: z.number().optional(),
      healthCenters: z.number().optional(),
      roads: z.string().optional(),
      developmentIndex: z
        .enum(["Low", "Medium", "High", "Very High"])
        .optional(),
    })
    .optional(),
});
