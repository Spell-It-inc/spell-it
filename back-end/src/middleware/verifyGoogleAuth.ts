// middleware/verifyGoogleAuth.ts

import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { AccountModel } from "../models/account";

dotenv.config({ path: "local.env" });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface AuthenticatedRequest extends Request {
  user?: { account_id: number }; // attach account_id here
}

export const verifyGoogleAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload?.sub) {
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    const account = await AccountModel.findByAuthSub(payload.sub);
    if (!account) {
      res.status(401).json({ message: "Account not found" });
      return;
    }

    // Attach account_id to the request object
    req.user = { account_id: account.account_id };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
