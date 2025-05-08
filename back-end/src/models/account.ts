import { pool } from "../config/database";
import type { Account } from "../interfaces/account";
import type { Profile } from "../interfaces/profile";

export class AccountModel {
  static async findById(id: number): Promise<Account> {
    const query =
      "SELECT account_id, auth_sub, created_at FROM accounts WHERE account_id = $1";

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findProfilesByAccountId(id: number): Promise<Profile[]> {
    const query =
      "SELECT profile_id, account_id, username, age_group_id, created_at FROM profiles WHERE account_id = $1";

    const result = await pool.query(query, [id]);
    return result.rows;
  }
}
