import mongoose from "mongoose";
const Department = {
  EXECUTIVE_OFFICE: "Executive Office",
  HEALTH_SERVICES: "Health Services",
  PUBLIC_HEALTH: "Public Health",
  EDUCATION: "Education",
  AGRICULTURE: "Agriculture",
  FINANCE: "Finance",
  INFRASTRUCTURE: "Infrastructure",
};

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: Object.values(Department),
        message: `Department must be one of: ${Object.values(Department).join(
          ", "
        )}`,
      },
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
      match: [/^(0\d{9}|\+\d{12})$/, "Please enter a valid phone number"], // Fixed regex
    },
    cabine: {
      // Fixed: changed from "cabinet" to "cabine"
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabine", // Fixed: changed from "Cabinet" to "Cabine"
      required: [true, "Cabine reference is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
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
memberSchema.index({ cabine: 1, order: 1 });
memberSchema.index({ department: 1 });
memberSchema.index({ isActive: 1 });
memberSchema.index({ name: 1 });

export const Member = mongoose.model("Member", memberSchema);
