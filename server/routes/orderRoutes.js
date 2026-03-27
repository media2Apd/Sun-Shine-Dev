import express from "express";

import * as controller from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router=express.Router();


router.post("/create", authMiddleware, controller.createOrder);
router.get("/view-all", authMiddleware, controller.getOrders);
router.get("/view-one/:id", authMiddleware, controller.getOrderById);
router.patch("/status-update/:id", authMiddleware, controller.updateOrderStatus);
router.patch("/cancel/:id", authMiddleware, controller.cancelOrder);
router.delete("/delete/:id", authMiddleware, controller.deleteOrder);

router.post("/razorpay/create", authMiddleware, controller.createRazorpayOrder);
router.get("/all", authMiddleware, controller.getAllOrders);

export default router;