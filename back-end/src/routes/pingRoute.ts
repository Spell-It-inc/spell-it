import { Router } from "express";
import { PingController } from "../controllers/pingController";

const router = Router();

router.get("/", PingController.getPing);

export default router;
