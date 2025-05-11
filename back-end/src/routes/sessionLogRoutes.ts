import { Router } from "express";
import { sessionLogController } from "../controllers/sessionLogsController";
import { validateSessionLogData } from "../middleware/sessionLogValidator";

const router = Router();

router.get("/", sessionLogController.getAllSessionLogs);
router.get("/:id", sessionLogController.getSessionLogsById);
router.post("/", validateSessionLogData, sessionLogController.createSessionLog);

export default router;