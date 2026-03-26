import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserById,
  updateUserPassword,
  updateUserProfile,
  findAllUsers,
  getUserOverviewRepo,
} from "../repositories/userRepo.js";

export const sendResetOtpService = async (email, otpModel) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("User not found");

  // store OTP
  await otpModel.create({ email, otp: Math.floor(1000 + Math.random() * 9000) });

  return user;
};

export const resetPasswordService = async (email, otp, newPassword, otpModel) => {
  const otpData = await otpModel.findOne({ email, otp });
  if (!otpData) throw new Error("Invalid OTP");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(otpData.userId, hashedPassword);

  await otpModel.deleteMany({ email });

  return true;
};

export const getUserProfileService = async (id) => {
  return await findUserById(id);
};

export const updateUserProfileService = async (id, data) => {
  return await updateUserProfile(id, data);
};

export const getAllUsersService = async () => {
  return await findAllUsers();
};
export const getUserOverview = async () => {

return getUserOverviewRepo();

};