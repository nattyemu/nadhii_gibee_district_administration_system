import express from "express";
import cabineController from "./cabine.controller.js";
import authenticate from "../../middleware/authenticate.js";
import rateLimiters from "../../middleware/rateLimiters.js";

const router = express.Router();

//  PUBLIC ROUTES
router.get("/", cabineController.getCabines);
router.get("/:id", cabineController.getCabine);

// PROTECTED ROUTES (Admin only)
router.post("/", authenticate, rateLimiters, cabineController.createCabine);
router.put("/:id", authenticate, rateLimiters, cabineController.updateCabine);
router.delete(
  "/:id",
  authenticate,
  rateLimiters,
  cabineController.deleteCabine
);

export default router;
