import { createKebeleSchema, updateKebeleSchema } from "./kebele.schema.js";
import { db, schema } from "../../config/db.js";
import { eq } from "drizzle-orm";

const transformKebele = (kebele) => {
  return {
    id: kebele.id,
    name: kebele.name,
    type: kebele.type,
    population: kebele.population,
    area: kebele.area,
    elevation: kebele.elevation,
    image: kebele.image,
    description: kebele.description,
    features: kebele.features,
    contact: {
      administrator: kebele.contactAdministrator,
      phone: kebele.contactPhone,
      email: kebele.contactEmail,
    },
    status: {
      schools: kebele.statusSchools,
      healthCenters: kebele.statusHealthCenters,
      roads: kebele.statusRoads,
      developmentIndex: kebele.statusDevelopmentIndex,
    },
    createdAt: kebele.createdAt,
    updatedAt: kebele.updatedAt,
  };
};

// Helper to transform request data to database schema
const transformToDbSchema = (data) => {
  return {
    name: data.name,
    type: data.type,
    population: data.population,
    area: data.area,
    elevation: data.elevation,
    image: data.image,
    description: data.description,
    features: data.features,
    contactAdministrator:
      data.contact?.administrator || data.contactAdministrator,
    contactPhone: data.contact?.phone || data.contactPhone,
    contactEmail: data.contact?.email || data.contactEmail,
    statusSchools: data.status?.schools || data.statusSchools,
    statusHealthCenters: data.status?.healthCenters || data.statusHealthCenters,
    statusRoads: data.status?.roads || data.statusRoads,
    statusDevelopmentIndex:
      data.status?.developmentIndex || data.statusDevelopmentIndex,
  };
};

export const createKebele = async (req, res) => {
  try {
    const validatedData = createKebeleSchema.parse(req.body);

    // Check if kebele with same name exists
    const [existingKebele] = await db
      .select()
      .from(schema.kebeles)
      .where(eq(schema.kebeles.name, validatedData.name))
      .limit(1);

    if (existingKebele) {
      return res.status(400).json({
        success: false,
        error: "Kebele with this name already exists",
      });
    }

    // Transform to database schema format
    const dbData = transformToDbSchema(validatedData);

    const [result] = await db.insert(schema.kebeles).values(dbData);

    const [newKebele] = await db
      .select()
      .from(schema.kebeles)
      .where(eq(schema.kebeles.id, Number(result.insertId)));

    res.status(201).json({
      success: true,
      data: transformKebele(newKebele),
      message: "Kebele created successfully",
    });
  } catch (error) {
    console.error("Create kebele error:", error);
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

    // Check for duplicate entry error (MySQL error code 1062)
    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
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
    const kebeles = await db.select().from(schema.kebeles);

    res.json({
      success: true,
      data: kebeles.map(transformKebele),
      count: kebeles.length,
    });
  } catch (error) {
    console.error("Get kebeles error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch kebeles",
      message: error.message,
    });
  }
};

export const getKebele = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid kebele ID",
      });
    }

    const [kebele] = await db
      .select()
      .from(schema.kebeles)
      .where(eq(schema.kebeles.id, id));

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
    console.error("Get kebele error:", error);
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
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid kebele ID",
      });
    }

    // Check if kebele exists
    const [existingKebele] = await db
      .select()
      .from(schema.kebeles)
      .where(eq(schema.kebeles.id, id));

    if (!existingKebele) {
      return res.status(404).json({
        success: false,
        error: "Kebele not found",
      });
    }

    // Transform to database schema format
    const dbData = transformToDbSchema(validatedData);
    dbData.updatedAt = new Date();

    // Update kebele
    await db
      .update(schema.kebeles)
      .set(dbData)
      .where(eq(schema.kebeles.id, id));

    // Get updated kebele
    const [updatedKebele] = await db
      .select()
      .from(schema.kebeles)
      .where(eq(schema.kebeles.id, id));

    res.json({
      success: true,
      data: transformKebele(updatedKebele),
      message: "Kebele updated successfully",
    });
  } catch (error) {
    console.error("Update kebele error:", error);
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

    // Check for duplicate entry error (MySQL error code 1062)
    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
      return res.status(400).json({
        success: false,
        error: "Kebele with this name already exists",
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
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid kebele ID",
      });
    }

    // Check if kebele exists
    const [kebele] = await db
      .select()
      .from(schema.kebeles)
      .where(eq(schema.kebeles.id, id));

    if (!kebele) {
      return res.status(404).json({
        success: false,
        error: "Kebele not found",
      });
    }

    // Delete kebele
    await db.delete(schema.kebeles).where(eq(schema.kebeles.id, id));

    res.json({
      success: true,
      message: "Kebele deleted successfully",
      data: { id: id },
    });
  } catch (error) {
    console.error("Delete kebele error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete kebele",
      message: error.message,
    });
  }
};
