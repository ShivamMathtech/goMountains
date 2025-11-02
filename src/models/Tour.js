import mongoose from "mongoose";
const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true }, // in days
    maxGroupSize: { type: Number, default: 10 },
    images: [String],
    availableDates: [Date],
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
export default mongoose.model("Tour", tourSchema);
