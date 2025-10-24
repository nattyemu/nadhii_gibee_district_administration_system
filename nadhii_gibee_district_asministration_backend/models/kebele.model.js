import mongoose from "mongoose";

const kebeleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["Rural Kebele", "City Kebele"],
      required: true,
    },
    population: String,
    area: String,
    elevation: String,
    image: String,
    description: String,
    features: [String],
    contact: {
      administrator: String,
      phone: String,
      email: String,
    },
    stats: {
      schools: Number,
      healthCenters: Number,
      roads: String,
      developmentIndex: {
        type: String,
        enum: ["Low", "Medium", "High", "Very High"],
      },
    },
  },
  { timestamps: true }
);
export const Kebele = mongoose.model("Kebele", kebeleSchema);
