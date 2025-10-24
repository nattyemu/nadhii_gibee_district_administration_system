import mongoose from "mongoose";
const ContentType = {
  NEWS: "news",
  ANNOUNCEMENT: "announcement",
  EVENT: "event",
};

const Category = {
  DEVELOPMENT: "Development",
  COMMUNITY: "Community",
  CULTURE: "Culture",
  AGRICULTURE: "Agriculture",
  INFRASTRUCTURE: "Infrastructure",
  ANNOUNCEMENT: "Announcement",
};

const newsArticleSchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
    },
    content: {
      type: String,
      trim: true,
    },

    // Categorization
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: Object.values(ContentType),
        message: `Type must be one of: ${Object.values(ContentType).join(
          ", "
        )}`,
      },
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: Object.values(Category),
        message: `Category must be one of: ${Object.values(Category).join(
          ", "
        )}`,
      },
    },

    // Media
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },

    // Metadata
    date: {
      type: Date,
      required: [true, "Publication date is required"],
    },
    author: {
      type: String,
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },

    // Event Specific (optional)
    location: {
      type: String,
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },

    // Tags & Classification
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],

    // Flags & Status
    featured: {
      type: Boolean,
      default: false,
    },
    urgent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for better query performance
newsArticleSchema.index({ type: 1, date: -1 });
newsArticleSchema.index({ category: 1, date: -1 });
newsArticleSchema.index({ featured: -1, date: -1 });
newsArticleSchema.index({ urgent: -1, date: -1 });
newsArticleSchema.index({ isActive: 1, date: -1 });
newsArticleSchema.index({ tags: 1 });

// Text search index for title and excerpt
newsArticleSchema.index({
  title: "text",
  excerpt: "text",
  content: "text",
});

export const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);
