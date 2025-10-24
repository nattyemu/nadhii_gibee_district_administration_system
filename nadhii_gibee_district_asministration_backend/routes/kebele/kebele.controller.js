import { Kebele } from "../../models/kebele.model.js";
import { createKebeleSchema, updateKebeleSchema } from "./kebele.schema.js";

const transformKebele = (kebele) => {
  const kebeleObj = kebele.toObject();
  kebeleObj.id = kebeleObj._id.toString();
  delete kebeleObj._id;
  delete kebeleObj.__v;
  return kebeleObj;
};

export const createKebele = async (req, res) => {
  try {
    const validatedData = createKebeleSchema.parse(req.body);
    const kebele = new Kebele(validatedData);
    await kebele.save();

    res.status(201).json({
      success: true,
      data: transformKebele(kebele),
      message: "Kebele created successfully",
    });
  } catch (error) {
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
        error: "Kebele with this name already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const getKebeles = async (req, res) => {
  try {
    const kebeles = await Kebele.find();

    res.json({
      success: true,
      data: kebeles.map(transformKebele),
      count: kebeles.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch kebeles",
      message: error.message,
    });
  }
};

export const getKebele = async (req, res) => {
  try {
    const kebele = await Kebele.findById(req.params.id);
    if (!kebele) {
      return res.status(404).json({
        success: false,
        error: "Kebele not found",
      });
    }

    res.json({
      success: true,
      data: transformKebele(kebele),
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid kebele ID",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to fetch kebele",
      message: error.message,
    });
  }
};

export const updateKebele = async (req, res) => {
  try {
    const validatedData = updateKebeleSchema.parse(req.body);
    const kebele = await Kebele.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!kebele) {
      return res.status(404).json({
        success: false,
        error: "Kebele not found",
      });
    }

    res.json({
      success: true,
      data: transformKebele(kebele),
      message: "Kebele updated successfully",
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
        error: "Invalid kebele ID",
      });
    }

    res.status(400).json({
      success: false,
      error: "Failed to update kebele",
      message: error.message,
    });
  }
};

export const deleteKebele = async (req, res) => {
  try {
    const kebele = await Kebele.findByIdAndDelete(req.params.id);

    if (!kebele) {
      return res.status(404).json({
        success: false,
        error: "Kebele not found",
      });
    }

    res.json({
      success: true,
      message: "Kebele deleted successfully",
      data: { id: kebele._id.toString() },
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid kebele ID",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to delete kebele",
      message: error.message,
    });
  }
};
