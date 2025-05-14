import { pool } from "../config/database";
import type { SessionLog } from "../interfaces/sessionLog";

export class SessionLogModel {
    static async findAllSessionLogs(): Promise<SessionLog[] | null> {
        const query =
            "SELECT * FROM session_logs";

        const result = await pool.query(query);
        return result.rows;
    }

    static async findSessionLogById(id: number): Promise<SessionLog | null> {
        const query = "SELECT * from session_logs where session_log_id = $1";

        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async createSessionLog(data: {
        profile_id: number;
        game_id: number;
        category_id: number;
        score: number;
    }): Promise<SessionLog> {
        const query = `
          INSERT INTO session_logs (profile_id, game_id, category_id, score)
          VALUES ($1, $2, $3, $4);
        `;

        const values = [data.profile_id, data.game_id, data.category_id, data.score];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

}