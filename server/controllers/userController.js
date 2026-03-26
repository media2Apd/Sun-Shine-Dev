import TempOtp from "../models/TempOtp.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js"; // create your nodemailer util

import * as userService from "../services/userService.js";

import { updateProfileValidator, resetPasswordSchema } from "../validators/userValid.js";

export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Clear old OTPs
    await TempOtp.deleteMany({ email });

    // 3. Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // 4. Save OTP
    await TempOtp.create({
      email,
      otp,
      expireAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry (optional)
    });

    // ✅ 5. SEND EMAIL (THIS WAS MISSING)
    await sendEmail(email, `Your password reset OTP is: ${otp}`);

    // 5. Send Response
    res.json({
      success: true,
      message: "OTP sent successfully",
      otp, // remove before production
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const otpData = await TempOtp.findOne({ email, otp });
    if (!otpData)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword }
    );

    await TempOtp.deleteMany({ email });

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await userService.getUserProfileService(req.user.id);
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileValidator.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    const updatedUser = await userService.updateUserProfileService(
      req.user.id,
      req.body
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();

    res.json({
      success: true,
      count: users.length,
      data: users
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getAdminCustomers = async (req, res) => {
  try {
    const customers = await User.aggregate([
      /* 1️⃣ MATCH – only normal users (optional) */
      {
        $match: {
          role: { $in: ["user", "admin"] } // admin venam na remove pannalaam
        }
      },

      /* 2️⃣ LOOKUP ORDERS */
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "userId",
          as: "orders"
        }
      },

      /* 3️⃣ ADD CALCULATED FIELDS */
      {
        $addFields: {
          orderCount: { $size: "$orders" },
          totalSpend: {
            $ifNull: [
              { $sum: "$orders.totalAmount" },
              0
            ]
          }
        }
      },

      /* 4️⃣ PROJECT REQUIRED DATA */
      {
        $project: {
          password: 0,
          orders: 0,
          __v: 0
        }
      },

      /* 5️⃣ SORT */
      {
        $sort: { totalSpend: -1 }
      }
    ]);

    res.json({
      success: true,
      count: customers.length,
      data: customers
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getCustomerStats = async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const totalCustomers = await User.countDocuments();

    const newCustomers = await User.countDocuments({
      createdAt: { $gte: last7Days }
    });

    res.json({
      success: true,
      stats: {
        totalCustomers,
        newCustomers,
        visitors: 250000 // (static / analytics)
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User status updated",
      data:user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "User role updated",
      data: user
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


export const getUserOverview = async (req,res)=>{

const data = await userService.getUserOverview();

res.json({

success:true,
data

});

};