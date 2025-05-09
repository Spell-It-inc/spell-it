import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AccountModel } from "../models/account";
import type { GoogleLoginRequestBody } from "../interfaces/auth";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface GooglePayload {
  sub: string;
  name?: string;
}

export class AuthController {
  static async handleGoogleLogin(req: Request, res: Response): Promise<void> {
    const { idToken } = req.body as GoogleLoginRequestBody;

    if (!idToken) {
      res.status(400).json({ errors: ["idToken is required"] });
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

      const token = jwt.sign(
        { accountId: account.account_id, sub: account.auth_sub },
        process.env.JWT_SECRET as string,
        { expiresIn: "30m" }
      );

      res.status(200).json({
        token,
        accountId: account.account_id,
      });
    } catch (error) {
      res.status(401).json({ errors: ["Authentication failed"] });
    }
  }
}
