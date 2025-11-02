import { types } from "joi";
import mongoose from "mongoose";
const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  bestSeason: {
    type: String,
  },
  attraction: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Destination", destinationSchema);
