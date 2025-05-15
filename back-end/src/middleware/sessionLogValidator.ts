import { Request, Response, NextFunction } from "express";
import { validateId, validateRequestBodyExists } from "../utils/validators";

export function validateSessionLogData(req: Request, res: Response, next: NextFunction): void {
    try {
        validateRequestBodyExists(req.body);

        const { profile_id, game_id, category_id, score } = req.body;
        const errors: string[] = [];

        validateId(profile_id, "profile_id");
        validateId(game_id, "game_id");
        validateId(category_id, "category_id");

        if (score !== undefined && isNaN(Number(score))) {
            errors.push("'score' must be a number if provided.");
        }

        next();
    } catch (error) {
        next(error);
    }

}
