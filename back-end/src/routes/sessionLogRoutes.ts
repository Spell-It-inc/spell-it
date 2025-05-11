import { Router } from "express";
import { sessionLogController } from "../controllers/sessionLogsController";

const router = Router();

router.get("/", sessionLogController.getAllSessionLogs);
router.get("/:id", sessionLogController.getSessionLogsById);

export default router;