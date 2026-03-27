import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();    

router.use(authMiddleware);

router.post("/create", reviewController.createReview);

router.get("/view-all/:productId", reviewController.getProductReviews);

export default router;
