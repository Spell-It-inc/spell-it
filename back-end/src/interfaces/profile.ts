import type { QueryResultRow } from "pg";

export interface Profile extends QueryResultRow {
  profile_id: number;
  account_id: number;
  username: string;
  age_group_id: number;
  created_at: Date;
}
