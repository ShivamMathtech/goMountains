import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "upi", "paypal", "stripe"],
      required: true,
    },
    transactionId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
