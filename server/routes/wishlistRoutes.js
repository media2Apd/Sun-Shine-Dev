import express from "express";

import * as controller from "../controllers/wishlistController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router=express.Router();


router.use(authMiddleware);


router.post("/add", controller.addToWishlist);


router.get("/view", controller.getWishlist);


router.delete("/remove", controller.removeFromWishlist);


router.delete("/clear", controller.clearWishlist);


export default router;