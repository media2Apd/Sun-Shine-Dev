import User from "../models/User.js";
import TempOtp from "../models/TempOtp.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js"; // create your nodemailer util
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import axios from "axios";

// Generate random OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

export const register = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required"
      });
    }

    /* =========================
       1️⃣ CHECK USER EXISTS
    ========================= */
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    /* =========================
       2️⃣ CLEAR OLD OTPs
    ========================= */
    await TempOtp.deleteMany({ email });

    /* =========================
       3️⃣ GENERATE & SAVE OTP
    ========================= */
    const otp = generateOtp();

    await TempOtp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000) // 5 min expiry
    });

    /* =========================
       4️⃣ SEND OTP EMAIL
    ========================= */
    await sendEmail(email, `Your verification OTP is: ${otp}`);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const verify = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp)
      return res.status(400).json({
        success: false,
        message: "Email, password & OTP are required",
      });

    // Check OTP exists
    const otpData = await TempOtp.findOne({ email, otp });
    if (!otpData)
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    // Create User Now
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // Delete OTP after success
    await TempOtp.deleteMany({ email });

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "Google access token required"
      });
    }

    /* ============================
       VERIFY TOKEN WITH GOOGLE
    ============================ */
    const googleRes = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    const { email, name, picture } = googleRes.data;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google authentication failed"
      });
    }

    /* ============================
       FIND / CREATE USER
    ============================ */
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        avatar: picture,
        authProvider: "google"
      });
    }

    /* ============================
       CREATE OUR JWT
    ============================ */
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Google login successful",
      token,
      user
    });

  } catch (err) {
    console.error("Google login error:", err.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: "Google authentication failed"
    });
  }
};

export const facebookAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const fbRes = await axios.get(
      `https://graph.facebook.com/me?fields=id,email&access_token=${accessToken}`
    );

    const { id, email } = fbRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        provider: "facebook",
        providerId: id
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ success: true, token, user });

  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};