import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";
import cartRoutes from "./cartRoutes.js";
import express from "express";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/enquiries", enquiryRoutes);
router.use("/cart", cartRoutes);

export default router;