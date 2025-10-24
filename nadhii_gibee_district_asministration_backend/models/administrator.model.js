import mongoose from "mongoose";

const administratorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Administrator name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    title: {
      type: String,
      required: [true, "Administrator title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    image: {
      type: String,
      required: [true, "Image path is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Biography is required"],
      trim: true,
      maxlength: [2000, "Biography cannot exceed 2000 characters"],
    },
    message: {
      type: String,
      required: [true, "Administrator message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    tenure: {
      type: String,
      required: [true, "Tenure period is required"],
      trim: true,
      maxlength: [50, "Tenure cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"],
    },
    office: {
      type: String,
      required: [true, "Office location is required"],
      trim: true,
      maxlength: [200, "Office location cannot exceed 200 characters"],
    },
    achievements: [
      {
        type: String,
        trim: true,
        maxlength: [
          500,
          "Achievement description cannot exceed 500 characters",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
administratorSchema.index({ isActive: 1, order: 1 });

const Administrator = mongoose.model("Administrator", administratorSchema);

export default Administrator;
