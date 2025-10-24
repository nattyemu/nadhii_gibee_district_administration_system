import express from "express";
import {
  createSector,
  getSectors,
  getSector,
  updateSector,
  deleteSector,
} from "./sector.controller.js";
import rateLimiters from "../../middleware/rateLimiters.js";
import authenticate from "../../middleware/authenticate.js";
const router = express.Router();

router.post("/", authenticate, rateLimiters, createSector);
router.get("/", getSectors);
router.get("/:id", getSector);
router.put("/:id", authenticate, rateLimiters, updateSector);
router.delete("/:id", authenticate, rateLimiters, deleteSector);

export default router;
