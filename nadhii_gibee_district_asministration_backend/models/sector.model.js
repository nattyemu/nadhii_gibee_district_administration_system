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
      employees: { type: Number, default: 0 },
      departments: { type: Number, default: 0 },
      facilities: { type: Number, default: 0 },
      schools: { type: Number, default: 0 },
      students: { type: String, default: "" },
      programs: { type: Number, default: 0 },
      farmers: { type: String, default: "" },
      projects: { type: Number, default: 0 },
      roads: { type: String, default: "" },
      budget: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export const Sector = mongoose.model("Sector", sectorSchema);
