import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import express from "express";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;