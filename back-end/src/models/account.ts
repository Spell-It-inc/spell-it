import { pool } from "../config/database";
import type { Account } from "../interfaces/account";

export class AccountModel {
  static async findById(id: number): Promise<Account> {
    const query =
      "SELECT account_id, auth_sub, created_at FROM accounts WHERE account_id = $1";

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}
