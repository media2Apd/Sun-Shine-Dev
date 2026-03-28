import express from "express";

import * as controller from "../controllers/dashBoardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/overview", controller.getDashboardOverview);

export default router;