import type { NextFunction, Request, Response } from "express";
import { GameModel } from "../models/game";
import { ensureExists, validateExistsInDB, validateId } from "../utils/validators";

export class GameController {

    static async getAllGames(req: Request, res: Response, next: NextFunction) {
        try {
            const games = await GameModel.findAll();

            res.json(games)
        } catch (error) {
            next(error);
        }
    }

    static async getGameById(req: Request, res: Response, next: NextFunction) {
        try {
            const gameId = validateId(req.params.id, "Game ID");

            const game = ensureExists(await GameModel.findById(gameId), "Game");

            res.json(game);

        } catch (error) {
            next(error);
        }
    }

    static async getCategoriesForGame(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gameId = validateId(req.params.id, "Game ID");

            const categories = ensureExists(await GameModel.findCategoriesForGame(gameId), "Categories");

            res.json(categories);

        } catch (error) {
            next(error);
        }
    }

    static async getWordsForGameCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const gameId = validateId(req.params.gameId, "Game ID");
            const categoryId = validateId(req.params.categoryId, "Category ID");
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const words = ensureExists(await GameModel.findWordsForGameCategory(gameId, categoryId, page, limit), "Words");
            res.json(words);
        } catch (error) {
            next(error);
        }
    }
}