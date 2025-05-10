import type { QueryResultRow } from "pg";

export interface Profile extends QueryResultRow {
  profile_id: number;
  account_id: number;
  username: string;
  age_group_id: number;
  created_at: Date;
}

export interface ProfileRewards {
  profile_id: number;
  username: string;
  rewards: Array<{
    reward_id: number;
    name: string;
    description: string;
    earned_at: Date;
  }>;
}
