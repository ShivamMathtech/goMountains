import express from "express";
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
} from "../controllers/tourController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllTours);
router.get("/:id", getTourById);

// Protected (admin-only) Routes
router.use(protect, restrictTo("admin"));

router.post("/", createTour);
router.patch("/:id", updateTour);
router.delete("/:id", deleteTour);

export default router;
