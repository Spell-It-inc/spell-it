import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

let _pool: Pool | null = null;

export const getPool = (): Pool => {
  console.log("Creating PostgreSQL connection pool");
  if (!_pool) {
    _pool = new Pool({
      host: "spell-it-db-instance.cuptqaxjh10z.af-south-1.rds.amazonaws.com",
      port: parseInt(process.env.DB_PORT || "5432"),
      user: "user1",
      password: "password1234",
      database: "postgres",
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
