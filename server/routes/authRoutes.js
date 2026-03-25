import express from "express";
import * as authCtrl from "../controllers/authController.js";
// import { googleLogin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authCtrl.register);
router.post("/verify-otp", authCtrl.verify);
router.post("/login", authCtrl.login);
router.post("/google-login", authCtrl.googleAuth);
router.post("/facebook-login", authCtrl.facebookAuth);

export default router;

