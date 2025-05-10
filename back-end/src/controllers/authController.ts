import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { AccountModel } from "../models/account";
import type { GoogleLoginRequestBody, GooglePayload } from "../interfaces/auth";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthController {
  static async handleGoogleLogin(req: Request, res: Response): Promise<void> {
    const { idToken } = req.body as GoogleLoginRequestBody;

    if (!idToken) {
      res.status(400).json({ error: "idToken is required" });
      return;
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload() as GooglePayload;

      if (!payload?.sub) {
        throw new Error("Invalid token payload");
      }

      const authSub = payload.sub;

      let account = await AccountModel.findByAuthSub(authSub);
      if (!account) {
        console.log("Creating new account...");
        account = await AccountModel.create(authSub);
        console.log("Account created:", account);
      }

      res.status(200).json({
        idToken,
        accountId: account.account_id,
      });
    } catch (error) {
      res.status(401).json({ error: "Authentication failed" });
    }
  }
}
