import { cabineSchema } from "./cabine.schema.js";
import { db, schema } from "../../config/db.js";
import { eq, and, not } from "drizzle-orm";

const transformCabineData = (cabine) => {
  return {
    id: cabine.id,
    name: cabine.name,
    title: cabine.title,
    position: cabine.position,
    image: cabine.image,
    phone: cabine.phone,
    email: cabine.email,
    order: cabine.order,
    createdAt: cabine.createdAt,
    updatedAt: cabine.updatedAt,
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
      const [existingCabine] = await db
        .select()
        .from(schema.cabines)
        .where(eq(schema.cabines.name, validatedCabineData.name))
        .limit(1);

      if (existingCabine) {
        return res.status(400).json({
          success: false,
          message: "Cabine name already exists",
        });
      }

      // Create the cabine
      const [result] = await db
        .insert(schema.cabines)
        .values(validatedCabineData);

      const [newCabine] = await db
        .select()
        .from(schema.cabines)
        .where(eq(schema.cabines.id, Number(result.insertId)));

      return res.status(201).json({
        success: true,
        message: "Cabine created successfully",
        data: transformCabineData(newCabine),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
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
      const cabineId = parseInt(id);

      if (isNaN(cabineId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid cabine ID",
        });
      }

      // Validate cabine exists
      const [existingCabine] = await db
        .select()
        .from(schema.cabines)
        .where(eq(schema.cabines.id, cabineId));

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
        const [cabineWithSameName] = await db
          .select()
          .from(schema.cabines)
          .where(
            and(
              eq(schema.cabines.name, validatedCabineData.name),
              not(eq(schema.cabines.id, cabineId))
            )
          )
          .limit(1);

        if (cabineWithSameName) {
          return res.status(400).json({
            success: false,
            message: "Cabine name already exists",
          });
        }
      }

      // Update cabine
      await db
        .update(schema.cabines)
        .set({
          ...validatedCabineData,
          updatedAt: new Date(),
        })
        .where(eq(schema.cabines.id, cabineId));

      const [updatedCabine] = await db
        .select()
        .from(schema.cabines)
        .where(eq(schema.cabines.id, cabineId));

      return res.status(200).json({
        success: true,
        message: "Cabine updated successfully",
        data: transformCabineData(updatedCabine),
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
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
      const cabines = await db
        .select()
        .from(schema.cabines)
        .orderBy(schema.cabines.order, schema.cabines.createdAt);

      return res.status(200).json({
        success: true,
        message: "Cabines retrieved successfully",
        data: cabines.map((cabine) => transformCabineData(cabine)),
      });
    } catch (error) {
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
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid cabine ID",
        });
      }

      const [cabine] = await db
        .select()
        .from(schema.cabines)
        .where(eq(schema.cabines.id, id));

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
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid cabine ID",
        });
      }

      const [cabine] = await db
        .select()
        .from(schema.cabines)
        .where(eq(schema.cabines.id, id));

      if (!cabine) {
        return res.status(404).json({
          success: false,
          message: "Cabine not found",
        });
      }

      // Delete the cabine
      await db.delete(schema.cabines).where(eq(schema.cabines.id, id));

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
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default cabineController;
