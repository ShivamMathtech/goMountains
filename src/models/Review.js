import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

// Prevent user from reviewing same tour twice
reviewSchema.index({ user: 1, tour: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
