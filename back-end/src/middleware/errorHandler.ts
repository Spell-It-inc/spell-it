import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof AppError && err.isOperational) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else if (err instanceof SyntaxError && "body" in err) {
        res.status(400).json({ error: "Malformed JSON in request body" });
    }
    else if (err instanceof Error) {
        console.error("Unexpected error: ", err.stack || err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
    else {
        res.status(500).json({ error: "Unknown error" });
    }
}