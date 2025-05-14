import type { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { decodeJwt } from "jose";
import dotenv from "dotenv";


dotenv.config({ path: "local.env" });

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthController {
  static async handleGoogleLogin(req: Request, res: Response): Promise<void> {
    const { code }= req.body;
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
    if (data.id_token) {
      res.status(200).json({data})
    } else {
      res.status(500).json({error:"Failed to authenticate"})
    }
    return
  }

  static async getTokenInfo(req: Request, res: Response): Promise<void> {
    const token = req.body
    console.log(token)
    try {
      res.status(200).json(decodeJwt(token.token))
    } catch (err) {
      res.status(500).json({error:"Not a token"})
    }
    return
  }
}
