import type { QueryResultRow } from "pg";

export interface Account extends QueryResultRow {
  account_id: number;
  auth_sub: string;
  created_at: Date;
}
