import { Router } from "express";
import authController from "./auth.controller.ts";

const router = Router();

router.post("/signin", authController.signin);
router.post("/create_account", authController.signup);

export default router;
