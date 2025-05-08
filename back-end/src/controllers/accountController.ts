import type { Request, Response } from "express";
import { AccountModel } from "../models/account";

export class AccountController {
  static async getAccountById(req: Request, res: Response) {
    try {
      const accountId = parseInt(req.params.id);

      if (isNaN(accountId) || accountId <= 0) {
        res.status(400).json({ errors: ["Invalid Account ID"] });
      } else {
        const account = await AccountModel.findById(accountId);

        if (!account) {
          res.status(404).json({ errors: ["Account not found"] });
        } else {
          res.json(account);
        }
      }
    } catch (error) {
      res.status(500).json({ errors: ["Failed to fetch profile"] });
    }
  }
}
