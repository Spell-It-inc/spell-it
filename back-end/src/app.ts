import express, { Express, Request, Response } from "express";
import profileRoutes from "./routes/profileRoutes";
import accountRoutes from "./routes/accountRoutes";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Spell It API" });
});

app.use("/api/auth", profileRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/accounts", accountRoutes);

export default app;
