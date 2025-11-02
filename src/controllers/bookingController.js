import catchAsync from "../utils/catchAsync.js";
import { sendResponse } from "../utils/sendResponse.js";
import * as bookingService from "../services/bookingService.js";

export const createBooking = catchAsync(async (req, res) => {
  const booking = await bookingService.createBooking(
    req.user.id,
    req.body.tourId,
    req.body
  );
  sendResponse(res, 201, true, "Booking created successfully", booking);
});

export const getUserBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getUserBookings(req.user.id);
  sendResponse(res, 200, true, "User bookings fetched", bookings);
});

export const getAllBookings = catchAsync(async (req, res) => {
  const bookings = await bookingService.getAllBookings();
  sendResponse(res, 200, true, "All bookings fetched successfully", bookings);
});

export const cancelBooking = catchAsync(async (req, res) => {
  const result = await bookingService.cancelBooking(req.params.id, req.user.id);
  sendResponse(res, 200, true, result.message);
});
