import type { Request, Response } from "express";
import { AuthService } from "../services/authService";

export class AuthController {
  static async handleGoogleLogin(req: Request, res: Response): Promise<void> {
    console.log("[POST] /api/auth/signin called");
    console.log("Request body:", req.body);

    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ errors: ["idToken is required"] });
      return;
    }

    try {
      const result = await AuthService.authenticateWithGoogle(idToken);
      res.status(200).json(result);
    } catch (error) {
      console.error("Authentication failed:", error);
      res.status(401).json({ errors: ["Authentication failed"] });
    }
  }
}
