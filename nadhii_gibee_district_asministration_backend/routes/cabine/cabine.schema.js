import { z } from "zod";

// Common validation schemas
const commonCabineValidations = {
  name: z.string().min(1, { message: "Name is required" }),

  title: z
    .string({
      required_error: "Cabine title is required",
    })
    .min(1, "Cabine title is required")
    .transform((val) => val.trim()),

  position: z
    .string({
      required_error: "Cabine position is required",
    })
    .min(1, "Cabine position is required")
    .transform((val) => val.trim()),

  image: z
    .string({
      required_error: "Cabine image is required",
    })
    .min(1, "Cabine image is required")
    .transform((val) => val.trim()),

  phone: z
    .string()
    .trim()
    .regex(/^(0\d{9}|\+?\d{10,15})$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),

  order: z.number().int().min(0).optional().default(0),
};

export const cabineSchema = {
  // CREATE - Create new cabine
  create: z.object({
    name: commonCabineValidations.name,
    title: commonCabineValidations.title,
    position: commonCabineValidations.position,
    image: commonCabineValidations.image,
    phone: commonCabineValidations.phone,
    email: commonCabineValidations.email,
    order: commonCabineValidations.order,
  }),

  // UPDATE - Update cabine
  update: z.object({
    name: commonCabineValidations.name.optional(),
    title: commonCabineValidations.title.optional(),
    position: commonCabineValidations.position.optional(),
    image: commonCabineValidations.image.optional(),
    phone: commonCabineValidations.phone.optional(),
    email: commonCabineValidations.email.optional(),
    order: commonCabineValidations.order.optional(),
  }),

  // GET/DELETE - by ID
  byId: z.object({
    id: z.string().min(1, "Cabine ID is required"),
  }),
};

// Export default
export default {
  cabineSchema,
};
