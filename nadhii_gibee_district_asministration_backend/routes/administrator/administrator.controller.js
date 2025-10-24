import Administrator from "../../models/administrator.model.js";
import administratorSchema from "./administrator.schema.js";

const administratorController = {
  // CREATE - Add new administrator
  createAdministrator: async (req, res) => {
    try {
      const validatedData = administratorSchema.create.parse(req.body);
      //  Check if the woreda already has an administrator
      const existingZoneAdmin = await Administrator.findOne({
        zone: validatedData.zone,
      });
      if (existingZoneAdmin) {
        return res.status(400).json({
          success: false,
          message: `Zone "${validatedData.zone}" already has an administrator.`,
        });
      }
      // Check if email already exists
      const existingAdmin = await Administrator.findOne({
        email: validatedData.email,
      });
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use by another administrator",
        });
      }

      const newAdministrator = new Administrator(validatedData);
      await newAdministrator.save();

      // Format response to match your desired structure
      const responseData = {
        id: newAdministrator._id,
        name: newAdministrator.name,
        title: newAdministrator.title,
        image: newAdministrator.image,
        bio: newAdministrator.bio,
        message: newAdministrator.message, // Added message field
        tenure: newAdministrator.tenure,
        email: newAdministrator.email,
        phone: newAdministrator.phone,
        office: newAdministrator.office,
        achievements: newAdministrator.achievements,
      };

      return res.status(201).json({
        success: true,
        message: "Administrator created successfully",
        data: responseData,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        console.log("ZOD ERRORS:", error.errors);
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
      const administrators = await Administrator.find()
        .sort({ createdAt: -1 })
        .select("-__v");

      // Format response to match your desired structure
      const formattedAdministrators = administrators.map((admin) => ({
        id: admin._id,
        name: admin.name,
        title: admin.title,
        image: admin.image,
        bio: admin.bio,
        message: admin.message, // Added message field
        tenure: admin.tenure,
        email: admin.email,
        phone: admin.phone,
        office: admin.office,
        achievements: admin.achievements,
      }));

      return res.status(200).json({
        success: true,
        message: "Administrators retrieved successfully",
        data: formattedAdministrators,
        count: formattedAdministrators.length,
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

      const administrator = await Administrator.findById(
        validatedParams.id
      ).select("-__v");

      if (!administrator) {
        return res.status(404).json({
          success: false,
          message: "Administrator not found",
        });
      }

      // Format response to match your desired structure
      const responseData = {
        id: administrator._id,
        name: administrator.name,
        title: administrator.title,
        image: administrator.image,
        bio: administrator.bio,
        message: administrator.message, // Added message field
        tenure: administrator.tenure,
        email: administrator.email,
        phone: administrator.phone,
        office: administrator.office,
        achievements: administrator.achievements,
      };

      return res.status(200).json({
        success: true,
        message: "Administrator retrieved successfully",
        data: responseData,
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

      // Check if email is being updated and if it's already in use
      if (validatedData.email) {
        const existingAdmin = await Administrator.findOne({
          email: validatedData.email,
          _id: { $ne: validatedParams.id },
        });
        if (existingAdmin) {
          return res.status(400).json({
            success: false,
            message: "Email is already in use by another administrator",
          });
        }
      }

      // Prepare update object
      const updateData = { ...validatedData };

      // If achievements are provided in the update, replace the entire array
      if (req.body.achievements !== undefined) {
        updateData.achievements = validatedData.achievements || [];
      }

      const updatedAdministrator = await Administrator.findByIdAndUpdate(
        validatedParams.id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
          select: "-__v",
        }
      );

      if (!updatedAdministrator) {
        return res.status(404).json({
          success: false,
          message: "Administrator not found",
        });
      }

      // Format response to match your desired structure
      const responseData = {
        id: updatedAdministrator._id,
        name: updatedAdministrator.name,
        title: updatedAdministrator.title,
        image: updatedAdministrator.image,
        bio: updatedAdministrator.bio,
        message: updatedAdministrator.message, // Added message field
        tenure: updatedAdministrator.tenure,
        email: updatedAdministrator.email,
        phone: updatedAdministrator.phone,
        office: updatedAdministrator.office,
        achievements: updatedAdministrator.achievements,
      };

      return res.status(200).json({
        success: true,
        message: "Administrator updated successfully",
        data: responseData,
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

      const administrator = await Administrator.findById(validatedParams.id);
      if (!administrator) {
        return res.status(404).json({
          success: false,
          message: "Administrator not found",
        });
      }

      await Administrator.findByIdAndDelete(validatedParams.id);

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

  // SEARCH - Search administrators by name or title
  searchAdministrators: async (req, res) => {
    try {
      const { query } = req.query;

      if (!query || query.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }

      const searchRegex = new RegExp(query, "i");

      const administrators = await Administrator.find({
        $or: [
          { name: searchRegex },
          { title: searchRegex },
          { email: searchRegex },
        ],
      })
        .sort({ createdAt: -1 })
        .select("-__v");

      // Format response to match your desired structure
      const formattedAdministrators = administrators.map((admin) => ({
        name: admin.name,
        title: admin.title,
        image: admin.image,
        bio: admin.bio,
        message: admin.message, // Added message field
        tenure: admin.tenure,
        email: admin.email,
        phone: admin.phone,
        office: admin.office,
        achievements: admin.achievements,
      }));

      return res.status(200).json({
        success: true,
        message: "Search completed successfully",
        data: formattedAdministrators,
        count: formattedAdministrators.length,
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
