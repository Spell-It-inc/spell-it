import express, { Express, Request, Response } from "express";
import profileRoutes from "./routes/profileRoutes";
import accountRoutes from "./routes/accountRoutes";
import authRoutes from "./routes/authRoutes";
import wordRoutes from "./routes/wordRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import gameRoutes from "./routes/gameRoutes";
import cors from "cors";
import { pool } from "./config/database";

const app: Express = express();

app.use(express.json());

app.use(cors({
  origin: "http://spellit.s3-website.af-south-1.amazonaws.com",
  credentials: true
}));

app.get("/", async (req: Request, res: Response) => {
  try {
    // Test database connection
    const client = await pool.connect();
    const result = await client.query(
      "SELECT NOW() as current_time, current_database() as database, current_user"
    );
    client.release();

    res.json({
      message: "Spell It API",
      dbConnection: "successful",
      dbInfo: {
        timestamp: result.rows[0].current_time,
        database: result.rows[0].database,
        user: result.rows[0].current_user,
        host: process.env.DB_HOST,
      },
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    res.status(500).json({
      message: "Spell It API",
      dbConnection: "failed",
      error: {
        message: error.message,
        code: error.code,
      },
      config: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      },
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/games", gameRoutes);  


export default app;
