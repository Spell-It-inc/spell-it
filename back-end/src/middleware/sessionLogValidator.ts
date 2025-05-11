import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function validateSessionLogData(req: Request, res: Response, next: NextFunction): void {
    if (!req.body || typeof req.body !== "object") {
        throw new AppError("Request body is missing or malformed", 400, true);
    }

    const { profile_id, game_id, category_id, score } = req.body;
    const errors: string[] = [];

    if (!profile_id || isNaN(Number(profile_id))) {
        errors.push("Invalid or missing 'profile_id'.");
    }

    if (!game_id || isNaN(Number(game_id))) {
        errors.push("Invalid or missing 'game_id'.");
    }

    if (!category_id || isNaN(Number(category_id))) {
        errors.push("Invalid or missing 'category_id'.");
    }

    if (score !== undefined && isNaN(Number(score))) {
        errors.push("'score' must be a number if provided.");
    }

    if (errors.length > 0) {
        throw new AppError(errors[0], 400, true);
    }

    next();
}
