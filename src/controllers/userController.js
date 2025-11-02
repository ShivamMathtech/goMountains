import catchAsync from "../utils/catchAsync.js";
import { sendResponse } from "../utils/sendResponse.js";
import * as userService from "../services/userService.js";

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  sendResponse(res, 200, true, "All users fetched successfully", users);
});

export const getUserProfile = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  sendResponse(res, 200, true, "User profile fetched successfully", user);
});

export const updateUserProfile = catchAsync(async (req, res) => {
  const updated = await userService.updateUser(req.user.id, req.body);
  sendResponse(res, 200, true, "Profile updated successfully", updated);
});

export const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  sendResponse(res, 200, true, "User deleted successfully");
});
