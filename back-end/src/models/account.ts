import { pool } from "../config/database";
import type { Account } from "../interfaces/account";

export class AccountModel {
  static async findById(id: number): Promise<Account> {
    const query = "SELECT account_id, auth_sub, created_at FROM accounts WHERE account_id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findByAuthSub(authSub: string): Promise<Account | null> {
    const query = "SELECT account_id, auth_sub, created_at FROM accounts WHERE auth_sub = $1";
    const result = await pool.query(query, [authSub]);
    return result.rows[0] || null;
  }

  static async create(authSub: string): Promise<Account> {
    const query =
      "INSERT INTO accounts (auth_sub, created_at) VALUES ($1, NOW()) RETURNING account_id, auth_sub, created_at";
    const result = await pool.query(query, [authSub]);
    return result.rows[0];
  }
}
