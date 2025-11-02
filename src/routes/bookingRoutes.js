// src/routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
} from "../controllers/bookingController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// @route   POST /api/bookings
router.post("/", createBooking);

// @route   GET /api/bookings/me
router.get("/me", getUserBookings);

// Admin access
router.use(restrictTo("admin"));

router.get("/", getAllBookings);
router.delete("/:id", cancelBooking);

export default router;
