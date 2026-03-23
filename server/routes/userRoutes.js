import express from "express";
import { authMiddleware, authorize } from "../middlewares/authMiddleware.js";
import * as userCtrl from "../controllers/userController.js";

const router = express.Router();

router.post("/forgot-password", userCtrl.sendResetOtp);
router.post("/reset-password", userCtrl.resetPassword);

router.get("/profile", authMiddleware, userCtrl.getProfile);
router.put("/update-profile", authMiddleware, userCtrl.updateProfile);
router.get("/view-all", authMiddleware, authorize("admin"), userCtrl.getAllUsers);
router.get("/customers", authMiddleware, userCtrl.getAdminCustomers);
router.get("/stats", authMiddleware, authorize("admin"), userCtrl.getCustomerStats);
router.put("/update-role/:userId", authMiddleware, authorize("admin"), userCtrl.updateUserRole);
router.put("/update-status/:userId", authMiddleware, authorize("admin"), userCtrl.updateUserStatus);

export default router;
