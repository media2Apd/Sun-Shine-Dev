import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { uploadReviewImages } from "../utils/Cloudinary.js";


const router = express.Router();    

// router.get("/view-all", reviewController.getAllReviews);

router.use(authMiddleware);

router.post("/create", uploadReviewImages, reviewController.createReview);

router.get("/view-all/:productId", reviewController.getProductReviews);


export default router;
