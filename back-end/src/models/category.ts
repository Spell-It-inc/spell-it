import { pool } from "../config/database";
import type { Category, CategoryWords } from "../interfaces/category";

export class CategoryModel {
  static async findById(id: number): Promise<Category | null> {
    const query =
      "SELECT category_id, name, description FROM categories WHERE category_id = $1";

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findWithWordsById(
    id: number,
    page: number = 1,
    itemsPerPage: number = 10
  ): Promise<CategoryWords | null> {
    const categoryQuery =
      "SELECT category_id, name FROM categories WHERE category_id = $1";
    const wordsQuery = `
    SELECT word_id, word
    FROM words
    WHERE category_id = $1
    LIMIT $2 OFFSET $3
  `;
    const countQuery = "SELECT COUNT(*) FROM words WHERE category_id = $1";

    const categoryResult = await pool.query(categoryQuery, [id]);
    if (categoryResult.rows.length === 0) {
      return null;
    }

    const countResult = await pool.query(countQuery, [id]);
    const totalItems = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    const offset = (page - 1) * itemsPerPage;
    const wordsResult = await pool.query(wordsQuery, [
      id,
      itemsPerPage,
      offset,
    ]);

    return {
      category_id: categoryResult.rows[0].category_id,
      name: categoryResult.rows[0].name,
      words: wordsResult.rows,
      pagination: {
        totalItems,
        itemCount: wordsResult.rows.length,
        itemsPerPage,
        totalPages,
        currentPage: page,
      },
    };
  }
}
