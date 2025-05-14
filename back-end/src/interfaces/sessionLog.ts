export interface SessionLog {
    session_log_id: number;
    profile_id: number;
    game_id: number;
    category_id: number;
    started_at: string;
    ended_at: string;
    score: number | null;
}