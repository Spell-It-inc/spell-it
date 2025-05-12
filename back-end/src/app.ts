import express, { Express, Request, Response } from "express";
import profileRoutes from "./routes/profileRoutes";
import accountRoutes from "./routes/accountRoutes";
import authRoutes from "./routes/authRoutes";
import wordRoutes from "./routes/wordRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import gameRoutes from "./routes/gameRoutes";
import cors from "cors";

const app: Express = express();

app.use(express.json());

app.use(cors({
  origin: "http://spellit.s3-website.af-south-1.amazonaws.com",
  credentials: true
}));

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Spell It API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/games", gameRoutes);  


export default app;
