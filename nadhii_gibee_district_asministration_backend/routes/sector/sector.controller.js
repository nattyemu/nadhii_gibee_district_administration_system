import { createSectorSchema, updateSectorSchema } from "./sector.schema.js";
import { db, schema } from "../../config/db.js";
import { eq } from "drizzle-orm";

const transformSector = (sector) => {
  // Return ALL status fields for frontend display
  return {
    id: sector.id,
    name: sector.name,
    category: sector.category,
    description: sector.description,
    image: sector.image,
    address: sector.address,
    phone: sector.phone,
    email: sector.email,
    hours: sector.hours,
    services: sector.services || [],
    officials: sector.officials || [],
    status: {
      // ALL status fields should be available for frontend
      employees: sector.statusEmployees || 0,
      departments: sector.statusDepartments || 0,
      facilities: sector.statusFacilities || 0,
      serving: sector.statusStudents || "", // serving is mapped from students
      schools: sector.statusSchools || 0,
      students: sector.statusStudents || "",
      programs: sector.statusPrograms || 0,
      farmers: sector.statusFarmers || "",
      projects: sector.statusProjects || 0,
      roads: sector.statusRoads || "",
      budget: sector.statusBudget || "",
    },
    createdAt: sector.createdAt,
    updatedAt: sector.updatedAt,
  };
};

// Helper to transform request data to database schema
const transformToDbSchema = (data) => {
  const status = data.status || {};

  // Map ALL status fields from frontend to database
  return {
    name: data.name || "",
    category: data.category || "administrative",
    description: data.description || "",
    image: data.image || "",
    address: data.address || "",
    phone: data.phone || "",
    email: data.email || "",
    hours: data.hours || "",
    services: data.services || [],
    officials: data.officials || [],

    // Map ALL status fields properly
    statusEmployees: parseInt(status.employees) || 0,
    statusDepartments: parseInt(status.departments) || 0,
    statusFacilities: parseInt(status.facilities) || 0,
    statusSchools: parseInt(status.schools) || 0,
    // serving and students both map to statusStudents
    statusStudents: status.serving || status.students || "",
    statusPrograms: parseInt(status.programs) || 0,
    statusFarmers: status.farmers || "",
    statusProjects: parseInt(status.projects) || 0,
    statusRoads: status.roads || "",
    statusBudget: status.budget || "",
  };
};

export const createSector = async (req, res) => {
  try {
    // console.log(
    //   "Creating sector with data:",
    //   JSON.stringify(req.body, null, 2)
    // );

    const validatedData = createSectorSchema.parse(req.body);

    // Check if sector with same name exists
    const [existingSector] = await db
      .select()
      .from(schema.sectors)
      .where(eq(schema.sectors.name, validatedData.name))
      .limit(1);

    if (existingSector) {
      return res.status(400).json({
        success: false,
        error: "Sector with this name already exists",
      });
    }

    // Transform to database schema format
    const dbData = transformToDbSchema(validatedData);
    // console.log("Transformed to DB schema:", dbData);

    const [result] = await db.insert(schema.sectors).values(dbData);

    const [newSector] = await db
      .select()
      .from(schema.sectors)
      .where(eq(schema.sectors.id, Number(result.insertId)));

    res.status(201).json({
      success: true,
      data: transformSector(newSector),
      message: "Sector created successfully",
    });
  } catch (error) {
    console.error("Create sector error:", error);
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

    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
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
    const sectors = await db.select().from(schema.sectors);

    res.json({
      success: true,
      data: sectors.map(transformSector),
      count: sectors.length,
    });
  } catch (error) {
    console.error("Get sectors error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch sectors",
      message: error.message,
    });
  }
};

export const getSector = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid sector ID",
      });
    }

    const [sector] = await db
      .select()
      .from(schema.sectors)
      .where(eq(schema.sectors.id, id));

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
    console.error("Get sector error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch sector",
      message: error.message,
    });
  }
};

export const updateSector = async (req, res) => {
  try {
    // console.log(
    // "Updating sector with data:",
    // JSON.stringify(req.body, null, 2)
    // );
    // console.log("Sector ID:", req.params.id);

    const validatedData = updateSectorSchema.parse(req.body);
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid sector ID",
      });
    }

    // Check if sector exists
    const [existingSector] = await db
      .select()
      .from(schema.sectors)
      .where(eq(schema.sectors.id, id));

    if (!existingSector) {
      return res.status(404).json({
        success: false,
        error: "Sector not found",
      });
    }

    // Transform to database schema format
    const dbData = transformToDbSchema(validatedData);
    dbData.updatedAt = new Date();

    // console.log("Transformed update data:", dbData);

    // Update sector
    await db
      .update(schema.sectors)
      .set(dbData)
      .where(eq(schema.sectors.id, id));

    // Get updated sector
    const [updatedSector] = await db
      .select()
      .from(schema.sectors)
      .where(eq(schema.sectors.id, id));

    res.json({
      success: true,
      data: transformSector(updatedSector),
      message: "Sector updated successfully",
    });
  } catch (error) {
    console.error("Update sector error details:", error);
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

    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
      return res.status(400).json({
        success: false,
        error: "Sector with this name already exists",
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
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid sector ID",
      });
    }

    const [sector] = await db
      .select()
      .from(schema.sectors)
      .where(eq(schema.sectors.id, id));

    if (!sector) {
      return res.status(404).json({
        success: false,
        error: "Sector not found",
      });
    }

    await db.delete(schema.sectors).where(eq(schema.sectors.id, id));

    res.json({
      success: true,
      message: "Sector deleted successfully",
      data: { id: id },
    });
  } catch (error) {
    console.error("Delete sector error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete sector",
      message: error.message,
    });
  }
};
