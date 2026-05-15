import express from "express";
import { getDashboardStats } from "../controller/dashboardController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);

export default router;
