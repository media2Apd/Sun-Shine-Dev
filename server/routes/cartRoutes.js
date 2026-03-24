import express from "express";
import * as controller from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/add", controller.addToCart);

router.get("/view", controller.getCart);

router.put("/update", controller.updateQuantity);

router.delete("/remove", controller.removeItem);

export default router;