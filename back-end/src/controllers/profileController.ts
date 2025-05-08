import { Request, Response } from "express";
import { ProfileModel } from "../models/profile";

export class ProfileController {
  static async getAllProfiles(req: Request, res: Response): Promise<void> {
    try {
      const profiles = await ProfileModel.findAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ errors: ["Failed to fetch profiles"] });
    }
  }

  static async getProfileById(req: Request, res: Response): Promise<void> {
    try {
      const profileId = parseInt(req.params.id);
      if (isNaN(profileId) || profileId <= 0) {
        res.status(400).json({ errors: ["Invalid profile ID"] });
        return;
      }

      const profile = await ProfileModel.findById(profileId);
      if (!profile) {
        res.status(404).json({ errors: ["Profile not found"] });
        return;
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ errors: ["Failed to fetch profile"] });
    }
  }

  static async createProfile(req: Request, res: Response): Promise<void> {
    try {
      const { account_id, username, age_group_id } = req.body;

      if (!account_id || !username || !age_group_id) {
        res.status(400).json({
          errors: ["account_id, username, and age_group_id are required"],
        });
        return;
      }

      const accountIdNum = parseInt(account_id);
      const ageGroupIdNum = parseInt(age_group_id);

      if (isNaN(accountIdNum) || accountIdNum <= 0) {
        res.status(400).json({ errors: ["Invalid account_id"] });
        return;
      }

      if (isNaN(ageGroupIdNum) || ageGroupIdNum <= 0) {
        res.status(400).json({ errors: ["Invalid age_group_id"] });
        return;
      }

      // Validate username
      if (typeof username !== "string" || username.trim().length === 0) {
        res
          .status(400)
          .json({ errors: ["Username must be a non-empty string"] });
        return;
      }

      const profile = await ProfileModel.create({
        account_id: accountIdNum,
        username: username.trim(),
        age_group_id: ageGroupIdNum,
      });

      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("does not exist")) {
          res.status(400).json({ errors: [error.message] });
          return;
        }
      }
      res.status(500).json({ errors: ["Failed to create profile"] });
    }
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      const profileId = parseInt(req.params.id);
      if (isNaN(profileId) || profileId <= 0) {
        res.status(400).json({ errors: ["Invalid profile ID"] });
        return;
      }

      // Check if profile exists before updating
      const existingProfile = await ProfileModel.findById(profileId);
      if (!existingProfile) {
        res.status(404).json({ errors: ["Profile not found"] });
        return;
      }

      const { username, age_group_id } = req.body;
      const updateData: { username?: string; age_group_id?: number } = {};

      if (username !== undefined) {
        if (typeof username !== "string" || username.trim().length === 0) {
          res
            .status(400)
            .json({ errors: ["Username must be a non-empty string"] });
          return;
        }
        updateData.username = username.trim();
      }

      if (age_group_id !== undefined) {
        const ageGroupIdNum = parseInt(age_group_id);
        if (isNaN(ageGroupIdNum) || ageGroupIdNum <= 0) {
          res.status(400).json({ errors: ["Invalid age_group_id"] });
          return;
        }
        updateData.age_group_id = ageGroupIdNum;
      }

      const profile = await ProfileModel.update(profileId, updateData);
      if (!profile) {
        res.status(404).json({ errors: ["Profile not found"] });
        return;
      }

      res.json(profile);
    } catch (error) {
      if (error instanceof Error && error.message.includes("does not exist")) {
        res.status(400).json({ errors: [error.message] });
        return;
      }
      res.status(500).json({ errors: ["Failed to update profile"] });
    }
  }
}
