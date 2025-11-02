import catchAsync from "../utils/catchAsync.js";
import { sendResponse } from "../utils/sendResponse.js";
import * as tourService from "../services/tourService.js";

export const createTour = catchAsync(async (req, res) => {
  const tour = await tourService.createTour(req.body);
  sendResponse(res, 201, true, "Tour created successfully", tour);
});

export const getAllTours = catchAsync(async (req, res) => {
  const tours = await tourService.getAllTours(req.query);
  sendResponse(res, 200, true, "Tours fetched successfully", tours);
});

export const getTourById = catchAsync(async (req, res) => {
  const tour = await tourService.getTourById(req.params.id);
  sendResponse(res, 200, true, "Tour details fetched", tour);
});

export const updateTour = catchAsync(async (req, res) => {
  const updated = await tourService.updateTour(req.params.id, req.body);
  sendResponse(res, 200, true, "Tour updated successfully", updated);
});

export const deleteTour = catchAsync(async (req, res) => {
  await tourService.deleteTour(req.params.id);
  sendResponse(res, 200, true, "Tour deleted successfully");
});
