import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { validateId, validatePresence } from "../utils/validators";

export function validateWordData(req: Request, res: Response, next: NextFunction): void {
    try {
        if (!req.body || typeof req.body !== "object") {
            throw new AppError("Request body is missing or malformed", 400, true);
        }

        const { category_id, word } = req.body;

        validatePresence(category_id, "category_id");
        validatePresence(word, "word");

        if (typeof word !== "string") {
            throw new AppError("'word' must be a non-empty string", 400, true);
        }

        const categoryId = validateId(category_id, "category_id");


        next();
    } catch (error) {
        next(error);
    }
}
