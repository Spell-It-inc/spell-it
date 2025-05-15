import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { validateId, validatePresence, validateRequestBodyExists } from "../utils/validators";

export const validateProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validateRequestBodyExists(req.body);

    const { username } = req.body;

    validatePresence(username, "username");

    if (typeof username !== "string" || username.trim().length === 0) {
      throw new AppError("'username' must be a non-empty string", 400, true);
    }

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
    validateRequestBodyExists(req.body);

    const { username } = req.body;

    if (username !== undefined) {
      if (typeof username !== "string" || username.trim().length === 0) {
        throw new AppError("'username' must be a non-empty string", 400, true);
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
