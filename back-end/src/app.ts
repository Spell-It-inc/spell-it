import express, { Express, Request, Response } from "express";
import profileRoutes from "./routes/profileRoutes";
import accountRoutes from "./routes/accountRoutes";
import authRoutes from "./routes/authRoutes";
import wordRoutes from "./routes/wordRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import gameRoutes from "./routes/gameRoutes";
import cors from "cors";
import { validateGoogleProfile } from "./middleware/verifyGoogleAuth";

const app: Express = express();

app.use(express.json());

app.use(cors({
  origin: process.env.REDIRECT_URI,
  credentials: true
}));

// app.use('/api', validateGoogleProfile);

app.use("/api/auth", authRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/games", gameRoutes);  
app.use("/api/auth", authRoutes);  


export default app;
