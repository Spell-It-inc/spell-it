import { Router } from "express";
import { sessionLogController } from "../controllers/sessionLogsController";
import { validateSessionLogData } from "../middleware/sessionLogValidator";
import { verifyGoogleAuth } from "../middleware/verifyGoogleAuth";

const router = Router();

router.get("/", sessionLogController.getAllSessionLogs);
router.get("/:id", sessionLogController.getSessionLogsById);
router.post("/", verifyGoogleAuth, validateSessionLogData, sessionLogController.createSessionLog);

export default router;