// src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//  Define schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name too long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // hides password in queries by default
    },

    phone: {
      type: String,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    role: {
      type: String,
      enum: ["user", "admin", "agent"],
      default: "user",
    },

    profileImage: {
      type: String, // can store image URL
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//  Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//  Compare passwords during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

//  Hide sensitive info when converting to JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// 🚀 Export model
const User = mongoose.model("User", userSchema);
export default User;
