import { Sector } from "../../models/sector.model.js";
import { createSectorSchema, updateSectorSchema } from "./sector.schema.js";

const transformSector = (sector) => {
  const sectorObj = sector.toObject();
  sectorObj.id = sectorObj._id.toString();
  delete sectorObj._id;
  delete sectorObj.__v;
  return sectorObj;
};

export const createSector = async (req, res) => {
  try {
    const validatedData = createSectorSchema.parse(req.body);
    const sector = new Sector(validatedData);
    await sector.save();

    res.status(201).json({
      success: true,
      data: transformSector(sector),
      message: "Sector created successfully",
    });
  } catch (error) {
    console.log(error.issues || error);
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Sector with this name already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const getSectors = async (req, res) => {
  try {
    const sectors = await Sector.find();

    res.json({
      success: true,
      data: sectors.map(transformSector),
      count: sectors.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch sectors",
      message: error.message,
    });
  }
};

export const getSector = async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    if (!sector) {
      return res.status(404).json({
        success: false,
        error: "Sector not found",
      });
    }

    res.json({
      success: true,
      data: transformSector(sector),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sector ID",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch sector",
      message: error.message,
    });
  }
};

export const updateSector = async (req, res) => {
  try {
    const validatedData = updateSectorSchema.parse(req.body);
    const sector = await Sector.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!sector) {
      return res.status(404).json({
        success: false,
        error: "Sector not found",
      });
    }

    res.json({
      success: true,
      data: transformSector(sector),
      message: "Sector updated successfully",
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details:
          error.issues?.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })) || [],
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sector ID",
      });
    }

    res.status(400).json({
      success: false,
      error: "Failed to update sector",
      message: error.message,
    });
  }
};

export const deleteSector = async (req, res) => {
  try {
    const sector = await Sector.findByIdAndDelete(req.params.id);

    if (!sector) {
      return res.status(404).json({
        success: false,
        error: "Sector not found",
      });
    }

    res.json({
      success: true,
      message: "Sector deleted successfully",
      data: { id: sector._id.toString() },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid sector ID",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to delete sector",
      message: error.message,
    });
  }
};
