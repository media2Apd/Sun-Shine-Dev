import User from "../models/User.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const updateUserPassword = async (id, hashedPassword) => {
  return await User.findByIdAndUpdate(
    id,
    { password: hashedPassword },
    { new: true }
  );
};

export const updateUserProfile = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

export const findAllUsers = async () => {
  return await User.find().select("-password"); // remove password for safety
};
