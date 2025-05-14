import { pool } from "../config/database";
import type { Game } from "../interfaces/game";

export class GameModel {
    static async findAll(): Promise<Game[]> {
        const query =
            "SELECT game_id, name, description FROM games ORDER BY name";

        const result = await pool.query(query);
        return result.rows
    }

    static async findById(id: number): Promise<Game | null> {
        const query =
            "SELECT game_id, name, description FROM games WHERE game_id = $1";

        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async findCategoriesForGame(gameId: number): Promise<{ category_id: number, name: string, description: string | null }[]> {
        const query = `
            SELECT c.category_id, c.name, c.description
            FROM categories c
            INNER JOIN game_categories gc ON c.category_id = gc.category_id
            WHERE gc.game_id = $1
            ORDER BY c.name
        `;
        const result = await pool.query(query, [gameId]);
        return result.rows;
    }

    static async findWordsForGameCategory(
        gameId: number,
        categoryId: number,
        page: number,
        limit: number
    ): Promise<{ word_id: number, word: string }[]> {
        const offset = (page - 1) * limit;

        const query = `
            SELECT w.word_id, w.word
            FROM words w
            INNER JOIN game_categories gc ON gc.category_id = w.category_id
            WHERE gc.game_id = $1 AND gc.category_id = $2
            ORDER BY w.word
            LIMIT $3 OFFSET $4
        `;
        const result = await pool.query(query, [gameId, categoryId, limit, offset]);
        return result.rows;
    }
}