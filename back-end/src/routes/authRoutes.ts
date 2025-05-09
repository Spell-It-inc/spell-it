import { Router, RequestHandler } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

const googleLoginHandler: RequestHandler = (req, res) =>
  AuthController.handleGoogleLogin(req, res);

router.post("/signin", googleLoginHandler);

export default router;
