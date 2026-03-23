import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Otp from "../models/otp.model.js";
import { genOtpCode, signAccessToken, signRefreshToken, hashToken } from "../utils/token.js";
import { sendMail } from "../config/mailer.js";

const SALT_ROUNDS = 12;

export async function registerUser({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: "Email already registered" };

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, password: hashed });

  // create otp
  const code = genOtpCode(6);
  const expiresAt = new Date(Date.now() + (Number(process.env.OTP_EXPIRES_MIN || 10) * 60 * 1000));
  await Otp.create({ userId: user._id, code, expiresAt });

  // send email (simple)
  await sendMail({
    to: user.email,
    subject: "Your R-Tex verification code",
    text: `Your verification code: ${code} (expires in ${process.env.OTP_EXPIRES_MIN || 10} minutes)`,
    html: `<p>Your verification code: <b>${code}</b></p><p>Expires in ${process.env.OTP_EXPIRES_MIN || 10} minutes.</p>`
  });

  return { userId: user._id, email: user.email };
}

export async function verifyOtp({ email, code }) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 404, message: "User not found" };

  const otp = await Otp.findOne({ userId: user._id, code, used: false }).sort({ createdAt: -1 });
  if (!otp) throw { status: 400, message: "Invalid code" };
  if (otp.expiresAt < new Date()) throw { status: 400, message: "OTP expired" };

  otp.used = true;
  await otp.save();

  user.isVerified = true;
  await user.save();
  return { ok: true };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: "Invalid credentials" };
  if (!user.isVerified) throw { status: 403, message: "Account not verified. Please verify email." };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { status: 401, message: "Invalid credentials" };

  const payload = { userId: user._id, email: user.email };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const refreshHash = hashToken(refreshToken);

  user.refreshTokenHash = refreshHash;
  await user.save();

  return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email } };
}

export async function refreshTokens({ refreshToken }) {
  // verify signature
  const jwt = await import("jsonwebtoken");
  let data;
  try {
    data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw { status: 401, message: "Invalid refresh token" };
  }

  const user = await User.findById(data.userId);
  if (!user) throw { status: 401, message: "User not found" };

  const refreshHash = hashToken(refreshToken);
  if (!user.refreshTokenHash || user.refreshTokenHash !== refreshHash) {
    throw { status: 401, message: "Refresh token mismatch" };
  }

  const payload = { userId: user._id, email: user.email };
  const newAccess = signAccessToken(payload);
  const newRefresh = signRefreshToken(payload);
  user.refreshTokenHash = hashToken(newRefresh);
  await user.save();

  return { accessToken: newAccess, refreshToken: newRefresh };
}

export async function logout({ userId }) {
  const user = await User.findById(userId);
  if (!user) return;
  user.refreshTokenHash = null;
  await user.save();
}
