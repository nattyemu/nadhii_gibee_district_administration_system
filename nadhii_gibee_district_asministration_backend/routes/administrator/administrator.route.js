import express from "express";
import administratorController from "./administrator.controller.js";
import authenticate from "../../middleware/authenticate.js";
import requireAdmin from "../../middleware/adminAuth.js";
import rateLimiters from "../../middleware/rateLimiters.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authenticate,
  requireAdmin,
  rateLimiters,
  administratorController.createAdministrator
);

// READ
router.get("/", administratorController.getAdministrators);
router.get("/search", administratorController.searchAdministrators);
router.get("/:id", administratorController.getAdministrator);

// UPDATE
router.put(
  "/:id",
  authenticate,
  rateLimiters,
  requireAdmin,
  administratorController.updateAdministrator
);

// DELETE
router.delete(
  "/:id",
  authenticate,
  rateLimiters,
  requireAdmin,
  administratorController.deleteAdministrator
);

export default router;
