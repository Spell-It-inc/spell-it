import type { NextFunction, Request, Response } from "express";
import { AccountModel } from "../models/account";
import { ensureExists, validateExistsInDB, validateId } from "../utils/validators";

export class AccountController {
  static async getAccountById(req: Request, res: Response, next: NextFunction) {

    try {
      const accountId = validateId(req.params.id, "Account ID");

      const account = ensureExists(await AccountModel.findById(accountId), "Account");

      res.json(account);

    } catch (error) {
      next(error);
    }
  }

  static async getProfilesByAccountId(req: Request, res: Response, next: NextFunction) {
    try {
      const accountId = validateId(req.params.id, "Account ID");

      await validateExistsInDB("accounts", "account_id", accountId, "Account");
      const profile = await AccountModel.findProfilesByAccountId(accountId);

      res.json(profile);
    } catch (error) {
      next(error);
    }
  }
}
