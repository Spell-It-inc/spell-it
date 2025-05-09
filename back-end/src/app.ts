import express, { Express, Request, Response } from "express";
import profileRoutes from "./routes/profileRoutes";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Spell It API" });
});

app.use("/api/auth", profileRoutes);
app.use("/api/profiles", profileRoutes);

export default app;
