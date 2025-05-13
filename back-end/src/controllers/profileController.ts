import { NextFunction, Request, Response } from "express";
import { ProfileModel } from "../models/profile";
import { ensureExists, validateExistsInDB, validateId, validatePresence } from "../utils/validators";
import { handleDatabaseError } from "../utils/handleDatabaseError";

export class ProfileController {
  static async getAllProfiles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profiles = await ProfileModel.findAll();
      res.json(profiles);
    } catch (error) {
      next(error);
    }
  }

  static async getProfileById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "profile ID");

      const profile = ensureExists(await ProfileModel.findById(profileId), "Profile");
      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async createProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { account_id, username, age_group_id } = req.body;

      const accountId = parseInt(account_id);
      const ageGroupId = parseInt(age_group_id);

      //check database existence
      await validateExistsInDB("accounts", "id", accountId, "Account");
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

  static async updateProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "id")

      // Check if profile exists before updating
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

  public static async getEarnedRewards(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profileId = validateId(req.params.id, "profile_id")

      const rewards = ensureExists(await ProfileModel.findEarnedRewardsByProfileId(profileId), "Profile");

      res.json(rewards);
    } catch (error: any) {
      next(error);
    }
  }
}
