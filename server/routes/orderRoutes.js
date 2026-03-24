import express from "express";

import * as controller from "../controllers/orderController.js";

const router=express.Router();


router.post("/create", controller.createOrder);

router.get("/all", controller.getOrders );

router.get("/single/:id", controller.getOrderById);

router.put("/status/:id", controller.updateOrderStatus);

router.put("/cancel/:id", controller.cancelOrder);

router.delete("/delete/:id", controller.deleteOrder );

router.post("/razorpay/create", controller.createRazorpayOrder);

router.post("/razorpay/verify", controller.verifyPayment);

export default router;