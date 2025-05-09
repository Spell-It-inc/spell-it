import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AccountModel } from "../models/account";

dotenv.config();

const client = new OAuth2Client();

interface GooglePayload {
  sub: string;
  name?: string;
}

export class AuthService {
  static async authenticateWithGoogle(idToken: string) {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload() as GooglePayload;

    if (!payload?.sub) {
      throw new Error("Invalid token payload");
    }

    const authSub = payload.sub;
    console.log("Google payload:", payload);

    let account = await AccountModel.findByAuthSub(authSub);
    if (!account) {
      console.log("Creating new account...");
      account = await AccountModel.create(authSub);
      console.log("Account created:", account);
    }

    const token = jwt.sign(
      { accountId: account.account_id, sub: account.auth_sub },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return {
      token,
      accountId: account.account_id,
    };
  }
}
