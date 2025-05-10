import { pool } from "../config/database";
import type { Word } from "../interfaces/word";

export class WordModel {
  public static async findAllByCategory(categoryId: number): Promise<Word[]> {
    const query = "SELECT * FROM words WHERE category_id = $1";
    const result = await pool.query<Word>(query, [categoryId]);
    return result.rows;
  }

  public static async create(categoryId: number, word: string): Promise<Word> {
    const query =
      "INSERT INTO words (category_id, word) VALUES ($1, $2) RETURNING *";
    const result = await pool.query<Word>(query, [categoryId, word]);
    return result.rows[0];
  }
}
