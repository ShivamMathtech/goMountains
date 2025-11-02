import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email already registered", 400);

  const user = await User.create({
    name,
    email,
    password,
    phone,
  });

  const token = generateToken(user._id);

  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError("Invalid email or password", 401);

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const token = generateToken(user._id);

  return { user, token };
};
