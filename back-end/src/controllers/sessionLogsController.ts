import type { NextFunction, Request, Response } from "express";
import { SessionLogModel } from "../models/sessionLog";
import { ensureExists, validateId } from "../utils/validators";

export class sessionLogController {
    static async getAllSessionLogs(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sessionLogs: SessionLogModel[] | null = await SessionLogModel.findAllSessionLogs();

            res.status(200).json(sessionLogs);
        }
        catch (error) {
            next(error);
        }
    }

    static async getSessionLogsById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const sessionLogId: number = validateId(req.params.id, "id");
            const sessionLog: SessionLogModel = ensureExists(await SessionLogModel.findSessionLogById(sessionLogId), "Session log");

            res.status(200).json(sessionLog);
        }
        catch (error) {
            next(error);
        }
    }

    static async createSessionLog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { profile_id, game_id, category_id, score } = req.body;

            const newLog = await SessionLogModel.createSessionLog({
                profile_id: Number(profile_id),
                game_id: Number(game_id),
                category_id: Number(category_id),
                score: Number(score) || 0,
            });

            res.status(201).json(newLog);
        } catch (error) {
            next(error);
        }
    }
}