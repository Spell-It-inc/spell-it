import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { validateProfileData, validateProfileUpdateData } from "../middleware/profileValidator";
import { verifyGoogleAuth } from "../middleware/verifyGoogleAuth";

const router = Router();

router.get("/", verifyGoogleAuth, ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getProfileById);
router.post("/", verifyGoogleAuth, validateProfileData, ProfileController.createProfile);
router.put("/:id", verifyGoogleAuth, validateProfileUpdateData, ProfileController.updateProfile);
router.get("/:id/rewards", ProfileController.getEarnedRewards);
router.get("/:id/session-logs", ProfileController.getProfileSessionLogs);

export default router;
