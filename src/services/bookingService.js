import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";
import AppError from "../utils/AppError.js";

export const createBooking = async (userId, tourId, bookingData) => {
  const tour = await Tour.findById(tourId);
  if (!tour) throw new AppError("Tour not found", 404);

  // Optional: check availability or capacity limits
  const booking = await Booking.create({
    user: userId,
    tour: tourId,
    ...bookingData,
  });

  return booking;
};

export const getUserBookings = async (userId) => {
  const bookings = await Booking.find({ user: userId }).populate("tour");
  return bookings;
};

export const getAllBookings = async () => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate("tour", "title location price");
  return bookings;
};

export const cancelBooking = async (bookingId, userId) => {
  const booking = await Booking.findOne({ _id: bookingId, user: userId });
  if (!booking) throw new AppError("Booking not found", 404);

  await booking.deleteOne();
  return { message: "Booking cancelled successfully" };
};
