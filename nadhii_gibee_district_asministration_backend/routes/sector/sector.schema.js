import { z } from "zod";

export const createSectorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  description: z.string().optional(),
  image: z.url().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number")
    .optional(),
  email: z.email().optional(),
  hours: z.string().optional(),
  services: z.array(z.string()).optional(),
  officials: z.array(z.string()).optional(),
  status: z
    .object({
      employees: z.number().optional(),
      departments: z.number().optional(),
      serving: z.string().optional(),
      facilities: z.number().optional(),
      schools: z.number().optional(),
      students: z.string().optional(),
      programs: z.number().optional(),
      farmers: z.string().optional(),
      projects: z.number().optional(),
      roads: z.string().optional(),
      budget: z.string().optional(),
    })
    .optional(),
});

export const updateSectorSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).optional(),
  category: z.string().min(1, { message: "Category is required" }).optional(),
  description: z.string().optional(),
  image: z.url().optional(),
  address: z.string().optional(),
  phone: z
    .string()
    .regex(/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number")
    .optional(),
  email: z.email().optional(),
  hours: z.string().optional(),
  services: z.array(z.string()).optional(),
  officials: z.array(z.string()).optional(),
  status: z
    .object({
      employees: z.number().optional(),
      departments: z.number().optional(),
      serving: z.string().optional(),
      facilities: z.number().optional(),
      schools: z.number().optional(),
      students: z.string().optional(),
      programs: z.number().optional(),
      farmers: z.string().optional(),
      projects: z.number().optional(),
      roads: z.string().optional(),
      budget: z.string().optional(),
    })
    .optional(),
});
