import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (data) => {
  return await Enquiry.create(data);
};

export const getAllEnquiries = async () => {
  return await Enquiry.find().sort({ createdAt: -1 });
};

export const getEnquiryById = async (id) => {
  return await Enquiry.findById(id);
};

// ✅ UPDATE STATUS
export const updateEnquiryStatus = async (id, data) => {
  const { status, note } = data;

  return await Enquiry.findByIdAndUpdate(
    id,
    {
      $set: { currentStatus: status },
      $push: {
        statusHistory: {
          status,
          note,
        },
      },
    },
    { new: true }
  );
};