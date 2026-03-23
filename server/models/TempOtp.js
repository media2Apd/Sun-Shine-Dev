import mongoose from "mongoose";

const tempOtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // OTP auto-delete in 5 minutes
});

export default mongoose.model("TempOtp", tempOtpSchema);
