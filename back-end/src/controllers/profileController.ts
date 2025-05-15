import { NextFunction, Response } from "express";
import { ProfileModel } from "../models/profile";
import { ensureExists, validateExistsInDB, validateId } from "../utils/validators";
import { handleDatabaseError } from "../utils/handleDatabaseError";
import { AuthenticatedRequest } from "../middleware/verifyGoogleAuth";

export class ProfileController {
  static async getAllProfiles(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profiles = await ProfileModel.findAll();
      res.json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async getProfileById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "profile ID");

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

      const { username, age_group_id } = req.body;
      const ageGroupId = parseInt(age_group_id);

      await validateExistsInDB("age_groups", "age_group_id", ageGroupId, "Age group");

      const profile = await ProfileModel.create({
        account_id: accountId,
        username: username.trim(),
        age_group_id: ageGroupId,
      });

      res.status(201).json(profile);
    } catch (error: any) {
      next(handleDatabaseError(error));
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "profile_id");

      const existingProfile = ensureExists(await ProfileModel.findById(profileId), "Profile");

      const { username, age_group_id } = req.body;
      const updateData: { username?: string; age_group_id?: number } = {};

      if (username !== undefined) {
        updateData.username = username.trim();
      }

      if (age_group_id !== undefined) {
        const ageGroupIdNum = parseInt(age_group_id);
        await validateExistsInDB("age_groups", "age_group_id", ageGroupIdNum, "Age group");
        updateData.age_group_id = ageGroupIdNum;
      }

      const profile = await ProfileModel.update(profileId, updateData);

      res.json(profile);
    } catch (error: any) {
      next(handleDatabaseError(error))
    }
  }

  static async getEarnedRewards(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "profile_id");

      const rewards = ensureExists(await ProfileModel.findEarnedRewardsByProfileId(profileId), "Profile");

      res.json(rewards);
    } catch (error: any) {
      next(error);
    }
  }
}
