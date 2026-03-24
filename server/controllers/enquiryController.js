import * as enquiryService from "../services/enquiryService.js";

export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await enquiryService.createEnquiryService(req.body);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryService.getAllEnquiriesService();

    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await enquiryService.getEnquiryByIdService(
      req.params.id
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ UPDATE STATUS CONTROLLER
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const updated = await enquiryService.updateEnquiryStatusService(
      req.params.id,
      { status, note }
    );

    res.status(200).json({
      success: true,
      message: "Enquiry status updated",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};