import express from "express";
import * as addressController from "../controllers/addressController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/add", addressController.createAddress);

router.get("/view", addressController.getAddresses);

router.get("/default", addressController.getDefaultAddress);

router.put("/set-default/:id", addressController.setDefaultAddress);

router.put("/update/:id", addressController.updateAddress);

router.delete("/delete/:id", addressController.deleteAddress);

export default router;