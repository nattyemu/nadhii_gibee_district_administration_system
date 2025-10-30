// routes/dashboardRoutes.js
import express from "express";
import { getDashboardStats } from "./dashboard.controller.js";

const router = express.Router();

// Get dashboard statistics
router.get("/stats", getDashboardStats);

export default router;
