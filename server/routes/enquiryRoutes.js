import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
} from "../controllers/enquiryController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create", createEnquiry);
router.get("/view-all", authMiddleware, getAllEnquiries);
router.get("/view-one/:id", authMiddleware, getEnquiryById);

// ✅ UPDATE STATUS ROUTE
router.patch("/status-update/:id", authMiddleware, updateEnquiryStatus);

export default router;