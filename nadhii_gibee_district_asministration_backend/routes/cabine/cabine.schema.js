import { z } from "zod";

// Common validation schemas
const commonCabineValidations = {
  name: z.string().min(1, { message: "Name is required" }),
  title: z.string().min(1, "Cabine title is required").trim(),
  position: z.string().min(1, "Cabine position is required").trim(),
  image: z.string().min(1, "Cabine image is required").trim(),
  phone: z
    .string()
    .regex(
      /^(0\d{9}|\+\d{12})$/,
      "Please enter a valid phone number (0XXXXXXXXX or +251XXXXXXXXX)"
    )
    .optional()
    .or(z.literal("")),
  email: z.email("Please enter a valid email").optional().or(z.literal("")),
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
    phone: commonCabineValidations.phone,
    email: commonCabineValidations.email,
    order: commonCabineValidations.order,
  }),

  // GET/DELETE - by ID
  byId: z.object({
    id: z.string().min(1, "Cabine ID is required"),
  }),
};

// Export for default import
export default {
  cabineSchema,
};
