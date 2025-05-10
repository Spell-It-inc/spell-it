import type { Request, Response } from "express";
import { AccountModel } from "../models/account";

export class AccountController {
  static async getAccountById(req: Request, res: Response) {
    console.error("testing error")
    console.error("testing log")
    try {
      const accountId = parseInt(req.params.id);

      if (isNaN(accountId) || accountId <= 0) {
        res.status(400).json({ error: "Invalid Account ID" });
      } else {
        const account = await AccountModel.findById(accountId);

        if (!account) {
          res.status(404).json({ error: "Account not found" });
        } else {
          res.json(account);
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch account" });
    }
  }

  static async getProfilesByAccountId(req: Request, res: Response) {
    try {
      const accountId = parseInt(req.params.id);

      if (isNaN(accountId) || accountId <= 0) {
        res.status(400).json({ error: "Invalid Account ID" });
      } else {
        const profiles = await AccountModel.findProfilesByAccountId(accountId);

        res.json(profiles);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch account profiles" });
    }
  }
}
