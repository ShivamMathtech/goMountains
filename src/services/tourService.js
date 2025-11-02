import Tour from "../models/Tour.js";
import AppError from "../utils/AppError.js";

export const createTour = async (tourData) => {
  const tour = await Tour.create(tourData);
  return tour;
};

export const getAllTours = async (filters = {}) => {
  const tours = await Tour.find(filters);
  return tours;
};

export const getTourById = async (id) => {
  const tour = await Tour.findById(id);
  if (!tour) throw new AppError("Tour not found", 404);
  return tour;
};

export const updateTour = async (id, updateData) => {
  const tour = await Tour.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!tour) throw new AppError("Tour not found", 404);
  return tour;
};

export const deleteTour = async (id) => {
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) throw new AppError("Tour not found", 404);
  return tour;
};
