import mongoose from "mongoose";

const cabineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Cabine name is required"],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Cabine title is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Cabine position is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Cabine image is required"],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
cabineSchema.index({ name: 1 });
cabineSchema.index({ title: 1 });
cabineSchema.index({ position: 1 });
cabineSchema.index({ order: 1 });

export const Cabine = mongoose.model("Cabine", cabineSchema);
