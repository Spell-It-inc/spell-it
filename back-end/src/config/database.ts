import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config({ path: 'local.env' });

let _pool: Pool | null = null;

export const getPool = (): Pool => {
  if (!_pool) {
    _pool = new Pool({
      host: "spell-it-db-instance.cuptqaxjh10z.af-south-1.rds.amazonaws.com",
      port: parseInt(process.env.DB_PORT || "5432"),
      user: "user1",
      password: "password1234",
      database: "postgres",
      ssl: {
        rejectUnauthorized: false, 
      },
    });
  }
  return _pool;
};

export const pool = getPool();