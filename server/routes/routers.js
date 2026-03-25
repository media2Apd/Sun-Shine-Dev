import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import productRoutes from "./productRoutes.js";
import enquiryRoutes from "./enquiryRoutes.js";
import cartRoutes from "./cartRoutes.js";
import orderRoutes from "./orderRoutes.js";
import blogRoutes from "./blogRoutes.js";
import wishlistRoutes from "./wishlistRoutes.js";
import express from "express";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/enquiries", enquiryRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/blog", blogRoutes);

export default router;