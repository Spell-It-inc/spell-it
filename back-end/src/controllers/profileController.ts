import { NextFunction, Response } from "express";
import { ProfileModel } from "../models/profile";
import { ensureExists, validateExistsInDB, validateId } from "../utils/validators";
import { handleDatabaseError } from "../utils/handleDatabaseError";
import { AuthenticatedRequest } from "../middleware/verifyGoogleAuth";

export class ProfileController {
  static async getAllProfiles(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.user?.account_id;

      if (!accountId) {
        res.status(401).json({ message: "Unauthorized: account ID missing" });
        return;
      }

      const profiles = await ProfileModel.findAll({
        where: {
          account_id: accountId
        }
      });

      res.json(profiles);
    } catch (error) {
      next(error);
    }
  }


  static async getProfileById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "Profile ID");

      const profile = ensureExists(await ProfileModel.findById(profileId), "Profile");
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.user?.account_id;
      if (!accountId) {
        res.status(401).json({ message: "Unauthorized: no account_id found" });
        return;
      }

      const { username } = req.body;

      const profile = await ProfileModel.create({
        account_id: accountId,
        username: username.trim(),
      });

      res.status(201).json(profile);
    } catch (error: any) {
      next(handleDatabaseError(error));
    }
  }

  public static async getProfileSessionLogs(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "Profile ID");

      const sessionLogs = ensureExists(await ProfileModel.findSessionLogByProfileId(profileId), "Session logs");

      res.json(sessionLogs);
    } catch (error) {
      next(error);
    }
  }
}
