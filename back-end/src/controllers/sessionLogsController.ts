import type { NextFunction, Request, Response } from "express";
import { SessionLogModel } from "../models/sessionLog";
import { AppError } from "../errors/AppError";
import { validateIdParam } from "../utils/validators";

export class sessionLogController {
    static async getAllSessionLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await SessionLogModel.findAllSessionLogs();

            if (!result || result.length === 0) {
                throw new AppError("No session logs found", 404, true);
            }
        }
        catch (error) {
            next(error);
        }
    }

    static async getSessionLogsById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sessionLogId = validateIdParam(req, "id");
            const result = await SessionLogModel.findSessionLogById(sessionLogId);

            if (!result) {
                throw new AppError("No session log found", 404, true);
            }
        }
        catch (error) {
            next(error);
        }
    }
}