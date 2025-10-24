import express from "express";
import {
  createKebele,
  getKebeles,
  getKebele,
  updateKebele,
  deleteKebele,
} from "./kebele.controller.js";
import rateLimiters from "../../middleware/rateLimiters.js";
import authenticate from "../../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate, rateLimiters, createKebele);
router.get("/", getKebeles);
router.get("/:id", getKebele);
router.put("/:id", authenticate, rateLimiters, updateKebele);
router.delete("/:id", authenticate, rateLimiters, deleteKebele);

export default router;
