import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let _pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!_pool) {
    _pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Log connection status
    _pool.on("connect", () => {
      console.log("Connected to PostgreSQL database");
    });

    _pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
    });
  }
  return _pool;
};

export const pool = getPool();
