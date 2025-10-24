import { Cabine } from "../../models/Cabine.model.js";
import { cabineSchema } from "./cabine.schema.js";

// Helper function to transform cabine data
const transformCabineData = (cabine) => {
  const cabineData = cabine.toObject ? cabine.toObject() : cabine;
  return {
    id: cabineData._id,
    name: cabineData.name,
    title: cabineData.title,
    position: cabineData.position,
    image: cabineData.image,
    phone: cabineData.phone,
    email: cabineData.email,
    order: cabineData.order,
    createdAt: cabineData.createdAt,
    updatedAt: cabineData.updatedAt,
  };
};

const cabineController = {
  // CREATE - Create cabine
  createCabine: async (req, res) => {
    try {
      const cabineData = req.body;

      // Validate cabine data
      const validatedCabineData = cabineSchema.create.parse(cabineData);

      // Check if cabine name already exists
      const existingCabine = await Cabine.findOne({
        name: validatedCabineData.name,
      });
      if (existingCabine) {
        return res.status(400).json({
          success: false,
          message: "Cabine name already exists",
        });
      }

      // Create the cabine
      const newCabine = new Cabine(validatedCabineData);
      await newCabine.save();

      return res.status(201).json({
        success: true,
        message: "Cabine created successfully",
        data: transformCabineData(newCabine),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        console.log("Zod validation error:", error.errors);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Create cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // UPDATE - Update cabine
  updateCabine: async (req, res) => {
    try {
      const { id } = req.params;
      const cabineData = req.body;

      // Validate cabine exists
      const existingCabine = await Cabine.findById(id);
      if (!existingCabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      // Validate cabine data
      const validatedCabineData = cabineSchema.update.parse(cabineData);

      // If name is being updated, check if new name already exists
      if (validatedCabineData.name) {
        const cabineWithSameName = await Cabine.findOne({
          name: validatedCabineData.name,
          _id: { $ne: id },
        });
        if (cabineWithSameName) {
          return res.status(400).json({
            success: false,
            message: "Cabine name already exists",
          });
        }
      }

      // Update cabine
      const updatedCabine = await Cabine.findByIdAndUpdate(
        id,
        { $set: validatedCabineData },
        {
          new: true,
          runValidators: true,
          select: "-__v",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Cabine updated successfully",
        data: transformCabineData(updatedCabine),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        console.log("Zod validation error:", error.errors);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Update cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // READ - Get all cabines
  getCabines: async (req, res) => {
    try {
      const cabines = await Cabine.find()
        .sort({ order: 1, createdAt: 1 })
        .select("-__v");

      return res.status(200).json({
        success: true,
        message: "Cabines retrieved successfully",
        data: cabines.map((cabine) => transformCabineData(cabine)),
      });
    } catch (error) {
      console.error("Get cabines error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get single cabine
  getCabine: async (req, res) => {
    try {
      const validatedParams = cabineSchema.byId.parse(req.params);

      const cabine = await Cabine.findById(validatedParams.id).select("-__v");
      if (!cabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Cabine retrieved successfully",
        data: transformCabineData(cabine),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Get cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // DELETE - Delete cabine
  deleteCabine: async (req, res) => {
    try {
      const validatedParams = cabineSchema.byId.parse(req.params);

      const cabine = await Cabine.findById(validatedParams.id);
      if (!cabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      // Delete the cabine
      await Cabine.findByIdAndDelete(validatedParams.id);

      return res.status(200).json({
        success: true,
        message: "Cabine deleted successfully",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Delete cabine error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default cabineController;
