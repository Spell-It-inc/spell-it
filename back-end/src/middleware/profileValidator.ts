import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { validateId, validatePresence, validateRequestBodyExists } from "../utils/validators";

export const validateProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    validateRequestBodyExists(req.body)

    const { account_id, username, age_group_id } = req.body;

    validatePresence(account_id, "account_id");
    validatePresence(username, "username");
    validatePresence(age_group_id, "age_group_id");

    if (typeof username !== "string") {
      throw new AppError("'username' must be a non-empty string", 400, true);
    }

    const accountId = validateId(account_id, "account_id");
    const ageGroupId = validateId(age_group_id, "age_group_id");

    next();

  } catch (error) {
    next(error);
  }
};

export const validateProfileUpdateData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateRequestBodyExists(req.body)

    const { username, age_group_id } = req.body;

    validatePresence(username, "username");
    validatePresence(age_group_id, "age_groupd_id");

    if (typeof username !== "string" || username.trim().length === 0) {
      throw new AppError("'username' must be a non-empty string", 400, true);
    }

    const ageGroupId = validateId(age_group_id, "age_group_id");

    next();
  } catch (error) {
    next(error);
  }

}
