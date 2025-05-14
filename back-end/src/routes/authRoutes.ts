import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/signin", AuthController.handleGoogleLogin);
router.post("/token-info", AuthController.getTokenInfo);

export default router;