import type { QueryResultRow } from "pg";

export interface Profile extends QueryResultRow {
  profile_id: number;
  account_id: number;
  username: string;
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

export interface ProfileSessionLogs {
  session_log_id: number;
  profile_id: number;
  game_name: string;
  category_name: string;
  score: number;
  started_at: Date; // or Date, depending on how you parse it
  ended_at: Date;   // or Date
}