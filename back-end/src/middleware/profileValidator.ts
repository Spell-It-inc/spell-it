import { Request, Response, NextFunction } from "express";

export const validateProfileData = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username } = req.body;
  const errors: string[] = [];

  // Validate username
  if (!username || typeof username !== "string") {
    errors.push("Username is required and must be a string");
  }

  if (errors.length > 0) {
    res.status(400).json({ error: errors[0] });
    return;
  }

  next();
};
