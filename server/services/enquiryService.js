import * as enquiryRepo from "../repositories/enquiryRepo.js";

export const createEnquiryService = async (data) => {
  if (!data.firstName || !data.email || !data.phone) {
    throw new Error("Required fields missing");
  }

  return await enquiryRepo.createEnquiry(data);
};

export const getAllEnquiriesService = async () => {
  return await enquiryRepo.getAllEnquiries();
};

export const getEnquiryByIdService = async (id) => {
  return await enquiryRepo.getEnquiryById(id);
};

// ✅ UPDATE STATUS SERVICE
export const updateEnquiryStatusService = async (id, data) => {
  return await enquiryRepo.updateEnquiryStatus(id, data);
};