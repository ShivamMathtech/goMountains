import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
import AppError from "./utils/AppError.js";
const app = express();
// --------------- GLOBAL MIDDLEWARE -------------
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

app.use(helmet()); //Secure HTTP headers
app.use(compression()); //Compress responses

/* ------------------------- Health Check ------------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🌍 Tour & Travel API is running successfully",
  });
});

// all api handler
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(globalErrorHandler);
export default app;
