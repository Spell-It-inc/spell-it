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

}