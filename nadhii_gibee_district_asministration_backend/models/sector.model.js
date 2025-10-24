import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: String,
    image: String,
    address: String,
    phone: String,
    email: String,
    hours: String,
    services: [String],
    officials: [String],
    status: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);
export const Sector = mongoose.model("Sector", sectorSchema);
