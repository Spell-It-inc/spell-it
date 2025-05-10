import type { QueryResultRow } from "pg";

export interface Word extends QueryResultRow {
  word_id: number;
  category_id: number;
  word: string;
}
