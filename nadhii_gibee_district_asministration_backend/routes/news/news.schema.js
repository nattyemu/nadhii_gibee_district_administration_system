import { z } from "zod";

export const ContentType = {
  NEWS: "news",
  ANNOUNCEMENT: "announcement",
  EVENT: "event",
};

export const Category = {
  DEVELOPMENT: "Development",
  COMMUNITY: "Community",
  CULTURE: "Culture",
  AGRICULTURE: "Agriculture",
  INFRASTRUCTURE: "Infrastructure",
  ANNOUNCEMENT: "Announcement",
};

export const newsSchema = {
  create: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title cannot exceed 200 characters")
      .trim(),
    excerpt: z
      .string()
      .min(1, "Excerpt is required")
      .max(500, "Excerpt cannot exceed 500 characters")
      .trim(),
    content: z.string().trim().optional(),
    type: z.enum(
      [ContentType.NEWS, ContentType.ANNOUNCEMENT, ContentType.EVENT],
      {
        required_error: "Type is required",
        invalid_type_error: `Type must be one of: ${Object.values(
          ContentType
        ).join(", ")}`,
      }
    ),
    category: z.enum(
      [
        Category.DEVELOPMENT,
        Category.COMMUNITY,
        Category.CULTURE,
        Category.AGRICULTURE,
        Category.INFRASTRUCTURE,
        Category.ANNOUNCEMENT,
      ],
      {
        required_error: "Category is required",
        invalid_type_error: `Category must be one of: ${Object.values(
          Category
        ).join(", ")}`,
      }
    ),
    image: z.string().min(1, "Image URL is required").trim(),
    date: z.string().min(1, "Publication date is required").or(z.date()),
    author: z
      .string()
      .max(100, "Author name cannot exceed 100 characters")
      .trim()
      .optional(),
    location: z
      .string()
      .max(100, "Location cannot exceed 100 characters")
      .trim()
      .optional(),
    tags: z
      .array(z.string().max(50, "Tag cannot exceed 50 characters").trim())
      .optional()
      .default([]),
    featured: z.boolean().optional().default(false),
    urgent: z.boolean().optional().default(false),
  }),

  update: z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title cannot exceed 200 characters")
      .trim()
      .optional(),
    excerpt: z
      .string()
      .min(1, "Excerpt is required")
      .max(500, "Excerpt cannot exceed 500 characters")
      .trim()
      .optional(),
    content: z.string().trim().optional(),
    type: z
      .enum([ContentType.NEWS, ContentType.ANNOUNCEMENT, ContentType.EVENT])
      .optional(),
    category: z
      .enum([
        Category.DEVELOPMENT,
        Category.COMMUNITY,
        Category.CULTURE,
        Category.AGRICULTURE,
        Category.INFRASTRUCTURE,
        Category.ANNOUNCEMENT,
      ])
      .optional(),
    image: z.string().min(1, "Image URL is required").trim().optional(),
    date: z.string().or(z.date()).optional(),
    author: z
      .string()
      .max(100, "Author name cannot exceed 100 characters")
      .trim()
      .optional(),
    location: z
      .string()
      .max(100, "Location cannot exceed 100 characters")
      .trim()
      .optional(),
    tags: z
      .array(z.string().max(50, "Tag cannot exceed 50 characters").trim())
      .optional(),
    featured: z.boolean().optional(),
    urgent: z.boolean().optional(),
  }),

  byId: z.object({
    id: z.string().min(1, "Article ID is required"),
  }),

  query: z.object({
    type: z
      .enum([ContentType.NEWS, ContentType.ANNOUNCEMENT, ContentType.EVENT])
      .optional(),
    category: z
      .enum([
        Category.DEVELOPMENT,
        Category.COMMUNITY,
        Category.CULTURE,
        Category.AGRICULTURE,
        Category.INFRASTRUCTURE,
        Category.ANNOUNCEMENT,
      ])
      .optional(),
    featured: z.enum(["true", "false"]).optional(),
    urgent: z.enum(["true", "false"]).optional(),
    search: z.string().optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),

  // Add tag
  addTag: z.object({
    tag: z
      .string()
      .min(1, "Tag is required")
      .max(50, "Tag cannot exceed 50 characters")
      .trim(),
  }),

  // Remove tag
  removeTag: z.object({
    id: z.string().min(1, "Article ID is required"),
    tag: z.string().min(1, "Tag is required"),
  }),
};

export default newsSchema;
