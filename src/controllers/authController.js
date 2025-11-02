import { sendResponse } from "../utils/sendResponse.js";
import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);
  sendResponse(res, 201, true, "User registered successfully", { user, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);
  sendResponse(res, 200, true, "Login successful", { user, token });
};
