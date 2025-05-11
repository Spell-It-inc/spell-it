import type { Request, Response } from "express";
import { GameModel } from "../models/game";
import { error } from "console";

export class GameController {

    static async getAllGames(req: Request, res: Response) {
        try {
            const games = await GameModel.findAll();

            res.json(games)
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch games" })
        }
    }

    static async getGameById(req: Request, res: Response) {
        try {
            const gameId = parseInt(req.params.id);

            if (isNaN(gameId) || gameId <= 0) {
                res.status(400).json({ error: "Invalid Game Id" }); 
            } else {
                const game = await GameModel.findById(gameId);

                if (!game) {
                    res.status(404).json({ error: "Game not found "});
                } else {
                    res.json(game);
                }
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch game" })
        }
    }

    static async getCategoriesForGame(req: Request, res: Response): Promise<void> {
        try {
            const gameId = parseInt(req.params.id);

            if (isNaN(gameId) || gameId <= 0) {
                res.status(400).json({ error: "Invalid Game Id"});
                return;
            }

            const categories = await GameModel.findCategoriesForGame(gameId);

            res.json(categories);

        } catch(error) {
            res.status(500).json({ error: "Failed to fetch categories"})
            return;
        }
    }

    static async getWordsForGameCategory(req: Request, res: Response): Promise<void> {
        try {
            const gameId = parseInt(req.params.gameId);
            const categoryId = parseInt(req.params.categoryId);
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            if (isNaN(gameId) || isNaN(categoryId) || gameId <= 0 || categoryId <= 0) {
                res.status(400).json({ error: "Invalid game or category ID" });
                return;
            }

            const words = await GameModel.findWordsForGameCategory(gameId, categoryId, page, limit);
            res.json(words);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch words" });
        }
    }
}