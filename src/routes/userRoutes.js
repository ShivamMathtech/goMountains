// src/routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// @route   GET /api/users/me
// @desc    Get logged-in user's profile
router.get("/me", getUserProfile);

// @route   PATCH /api/users/me
// @desc    Update user profile
router.patch("/me", updateUserProfile);

// Admin routes
router.use(restrictTo("admin"));

router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;
