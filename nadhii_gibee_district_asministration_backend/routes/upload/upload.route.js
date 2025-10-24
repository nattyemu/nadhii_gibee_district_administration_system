import express from "express";
import { upload } from "../../middleware/upload.middleware.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper function to get the correct file path
const getFilePath = (type, filename) => {
  return path.join(__dirname, "../../public/img", type, filename);
};

// Helper function to extract filename from URL
const extractFilenameFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  const urlParts = imageUrl.split("/");
  return urlParts[urlParts.length - 1];
};

// Upload image
router.post("/:type", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const fileUrl = `/img/${req.params.type}/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    url: fileUrl,
    filename: req.file.filename,
  });
});

// Update image - delete old and upload new
router.put("/:type/:filename?", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const { type, filename } = req.params;

    // Delete old file if provided and exists
    if (filename && filename !== "undefined" && filename !== "null") {
      const oldFilePath = getFilePath(type, filename);

      console.log(`Attempting to delete old file: ${oldFilePath}`);

      try {
        await fs.access(oldFilePath);
        await fs.unlink(oldFilePath);
        console.log(`✅ Successfully deleted old file: ${filename}`);
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log(`⚠️ Old file not found: ${filename}`);
        } else {
          console.error(
            `❌ Error deleting old file ${filename}:`,
            error.message
          );
          // Continue with upload even if deletion fails
        }
      }
    }

    const fileUrl = `/img/${type}/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      url: fileUrl,
      filename: req.file.filename,
      oldFilename: filename !== "undefined" ? filename : null,
    });
  } catch (error) {
    console.error("Error updating image:", error);
    res.status(500).json({
      success: false,
      message: "Error updating image",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Delete image
router.delete("/:type/:filename", async (req, res) => {
  try {
    const { type, filename } = req.params;

    if (!filename || filename === "undefined" || filename === "null") {
      return res.status(400).json({
        success: false,
        message: "Valid filename is required",
      });
    }

    const filePath = getFilePath(type, filename);

    console.log(`Attempting to delete image: ${filePath}`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      console.log(`⚠️ Image file not found: ${filename}`);
      return res.status(404).json({
        success: false,
        message: "Image file not found",
      });
    }

    // Delete the file
    await fs.unlink(filePath);
    console.log(`✅ Successfully deleted image: ${filename}`);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      filename: filename,
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Delete image by URL
router.delete("/:type/url/:imageUrl", async (req, res) => {
  try {
    const { type, imageUrl } = req.params;

    if (!imageUrl || imageUrl === "undefined" || imageUrl === "null") {
      return res.status(400).json({
        success: false,
        message: "Valid image URL is required",
      });
    }

    const filename = extractFilenameFromUrl(imageUrl);
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Could not extract filename from URL",
      });
    }

    const filePath = getFilePath(type, filename);

    console.log(`Attempting to delete image by URL: ${filePath}`);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      console.log(`⚠️ Image file not found: ${filename}`);
      return res.status(404).json({
        success: false,
        message: "Image file not found",
      });
    }

    // Delete the file
    await fs.unlink(filePath);
    console.log(`✅ Successfully deleted image: ${filename}`);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      filename: filename,
    });
  } catch (error) {
    console.error("Error deleting image by URL:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Bulk delete images
router.delete("/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const { filenames } = req.body;

    if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Array of filenames is required",
      });
    }

    const results = {
      deleted: [],
      failed: [],
    };

    // Delete each file
    for (const filename of filenames) {
      if (!filename || filename === "undefined") continue;

      const filePath = getFilePath(type, filename);

      try {
        await fs.access(filePath);
        await fs.unlink(filePath);
        results.deleted.push(filename);
        console.log(`✅ Successfully deleted: ${filename}`);
      } catch (error) {
        results.failed.push({
          filename,
          error: error.message,
        });
        console.error(`❌ Failed to delete ${filename}:`, error.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Bulk delete completed",
      results: results,
    });
  } catch (error) {
    console.error("Error in bulk delete:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting images",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
