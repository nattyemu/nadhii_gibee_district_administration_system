import administratorSchema from "./administrator.schema.js";
import { db, schema } from "../../config/db.js";
import { eq, like, and, not } from "drizzle-orm";

const administratorController = {
  // CREATE - Add new administrator
  createAdministrator: async (req, res) => {
    try {
      const validatedData = administratorSchema.create.parse(req.body);

      // Check if email already exists
      const [existingAdmin] = await db
        .select()
        .from(schema.administrators)
        .where(eq(schema.administrators.email, validatedData.email))
        .limit(1);

      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use by another administrator",
        });
      }

      // Create new administrator
      const [result] = await db.insert(schema.administrators).values({
        name: validatedData.name,
        title: validatedData.title,
        image: validatedData.image,
        bio: validatedData.bio,
        message: validatedData.message,
        tenure: validatedData.tenure,
        email: validatedData.email,
        phone: validatedData.phone,
        office: validatedData.office,
        achievements: validatedData.achievements || [],
      });

      return res.status(201).json({
        success: true,
        message: "Administrator created successfully",
        data: {
          id: Number(result.insertId),
          name: validatedData.name,
          title: validatedData.title,
          image: validatedData.image,
          bio: validatedData.bio,
          message: validatedData.message,
          tenure: validatedData.tenure,
          email: validatedData.email,
          phone: validatedData.phone,
          office: validatedData.office,
          achievements: validatedData.achievements || [],
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Create administrator error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get all administrators
  getAdministrators: async (req, res) => {
    try {
      const administrators = await db
        .select({
          id: schema.administrators.id,
          name: schema.administrators.name,
          title: schema.administrators.title,
          image: schema.administrators.image,
          bio: schema.administrators.bio,
          message: schema.administrators.message,
          tenure: schema.administrators.tenure,
          email: schema.administrators.email,
          phone: schema.administrators.phone,
          office: schema.administrators.office,
          achievements: schema.administrators.achievements,
          createdAt: schema.administrators.createdAt,
          updatedAt: schema.administrators.updatedAt,
        })
        .from(schema.administrators)
        .orderBy(schema.administrators.createdAt);

      return res.status(200).json({
        success: true,
        message: "Administrators retrieved successfully",
        data: administrators,
        count: administrators.length,
      });
    } catch (error) {
      console.error("Get administrators error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get single administrator by ID
  getAdministrator: async (req, res) => {
    try {
      const validatedParams = administratorSchema.byId.parse(req.params);
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid administrator ID",
        });
      }

      const [administrator] = await db
        .select({
          id: schema.administrators.id,
          name: schema.administrators.name,
          title: schema.administrators.title,
          image: schema.administrators.image,
          bio: schema.administrators.bio,
          message: schema.administrators.message,
          tenure: schema.administrators.tenure,
          email: schema.administrators.email,
          phone: schema.administrators.phone,
          office: schema.administrators.office,
          achievements: schema.administrators.achievements,
          createdAt: schema.administrators.createdAt,
          updatedAt: schema.administrators.updatedAt,
        })
        .from(schema.administrators)
        .where(eq(schema.administrators.id, id));

      if (!administrator) {
        return res.status(404).json({
          success: false,
          message: "Administrator not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Administrator retrieved successfully",
        data: administrator,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Get administrator error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // UPDATE - Update administrator
  updateAdministrator: async (req, res) => {
    try {
      const validatedParams = administratorSchema.byId.parse(req.params);
      const validatedData = administratorSchema.update.parse(req.body);
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid administrator ID",
        });
      }

      // Check if email is being updated and if it's already in use
      if (validatedData.email) {
        const [existingAdmin] = await db
          .select()
          .from(schema.administrators)
          .where(
            and(
              eq(schema.administrators.email, validatedData.email),
              not(eq(schema.administrators.id, id))
            )
          )
          .limit(1);

        if (existingAdmin) {
          return res.status(400).json({
            success: false,
            message: "Email is already in use by another administrator",
          });
        }
      }

      // Prepare update object
      const updateData = {
        ...validatedData,
        updatedAt: new Date(),
      };

      // If achievements are provided in the update, use them
      if (req.body.achievements !== undefined) {
        updateData.achievements = validatedData.achievements || [];
      }

      // Update administrator
      await db
        .update(schema.administrators)
        .set(updateData)
        .where(eq(schema.administrators.id, id));

      // Get updated administrator
      const [updatedAdministrator] = await db
        .select({
          id: schema.administrators.id,
          name: schema.administrators.name,
          title: schema.administrators.title,
          image: schema.administrators.image,
          bio: schema.administrators.bio,
          message: schema.administrators.message,
          tenure: schema.administrators.tenure,
          email: schema.administrators.email,
          phone: schema.administrators.phone,
          office: schema.administrators.office,
          achievements: schema.administrators.achievements,
          createdAt: schema.administrators.createdAt,
          updatedAt: schema.administrators.updatedAt,
        })
        .from(schema.administrators)
        .where(eq(schema.administrators.id, id));

      if (!updatedAdministrator) {
        return res.status(404).json({
          success: false,
          message: "Administrator not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Administrator updated successfully",
        data: updatedAdministrator,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Update administrator error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // DELETE - Delete administrator
  deleteAdministrator: async (req, res) => {
    try {
      const validatedParams = administratorSchema.byId.parse(req.params);
      const id = parseInt(validatedParams.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid administrator ID",
        });
      }

      // Check if administrator exists
      const [administrator] = await db
        .select()
        .from(schema.administrators)
        .where(eq(schema.administrators.id, id));

      if (!administrator) {
        return res.status(404).json({
          success: false,
          message: "Administrator not found",
        });
      }

      // Delete administrator
      await db
        .delete(schema.administrators)
        .where(eq(schema.administrators.id, id));

      return res.status(200).json({
        success: true,
        message: "Administrator deleted successfully",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Delete administrator error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // SEARCH - Search administrators by name, title, or email
  searchAdministrators: async (req, res) => {
    try {
      const { query } = req.query;

      if (!query || query.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }

      const searchTerm = `%${query}%`;

      const administrators = await db
        .select({
          id: schema.administrators.id,
          name: schema.administrators.name,
          title: schema.administrators.title,
          image: schema.administrators.image,
          bio: schema.administrators.bio,
          message: schema.administrators.message,
          tenure: schema.administrators.tenure,
          email: schema.administrators.email,
          phone: schema.administrators.phone,
          office: schema.administrators.office,
          achievements: schema.administrators.achievements,
          createdAt: schema.administrators.createdAt,
          updatedAt: schema.administrators.updatedAt,
        })
        .from(schema.administrators)
        .where(
          like(schema.administrators.name, searchTerm) ||
            like(schema.administrators.title, searchTerm) ||
            like(schema.administrators.email, searchTerm)
        )
        .orderBy(schema.administrators.createdAt);

      return res.status(200).json({
        success: true,
        message: "Search completed successfully",
        data: administrators,
        count: administrators.length,
      });
    } catch (error) {
      console.error("Search administrators error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};

export default administratorController;
