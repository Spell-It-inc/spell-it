import { pool } from "../config/database";
import type { Category } from "../interfaces/category";

export class CategoryModel {
  static async findById(id: number): Promise<Category | null> {
    const query =
      "SELECT category_id, name, description FROM categories WHERE category_id = $1";

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
