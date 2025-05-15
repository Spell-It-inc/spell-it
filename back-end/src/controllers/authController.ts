import type { Request, Response } from "express";
import dotenv from "dotenv";
import { decode } from "jsonwebtoken"
import { AccountModel } from "../models/account";
import { error } from "console";
import { JsonWebTokenError } from "jsonwebtoken";


dotenv.config({ path: "local.env" });

export class AuthController {
  static async handleGoogleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.body;
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID ?? "",
          client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
          redirect_uri: process.env.REDIRECT_URI + "/", // e.g., http://localhost:8080
          grant_type: 'authorization_code'
        })
      });
      const data = await response.json()
      if (data.id_token) {// Check if user exists in DB
        const userInfo = decode(data.id_token)
        if (userInfo && userInfo.sub && typeof userInfo.sub === "string") {
          let account = await AccountModel.findByAuthSub(userInfo.sub);
          if (!account) {
            console.log("Creating new account...");
            account = await AccountModel.create(userInfo.sub);
            console.log("Account created:", account);
          }
          res.status(200).json({ data })
        }
      } else {
        res.status(404).json({ error: "Invalid token" })
      }
    } catch (err) {
      res.status(500).json({error: err})
    }
    return
  }

  static async getTokenInfo(req: Request, res: Response): Promise<void> {
    const token = req.body.token
    const userInfo = decode(token)
    try {
      res.status(200).json(userInfo)
    } catch (err) {
      res.status(404).json({ error: "Not a valid token" })
    }
    return
  }
}