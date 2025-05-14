import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/signin", AuthController.handleGoogleLogin);

export default router;
