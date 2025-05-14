import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { validateProfileData, validateProfileUpdateData } from "../middleware/profileValidator";

const router = Router();

router.get("/", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getProfileById);
router.post("/", validateProfileData, ProfileController.createProfile);
router.put("/:id", validateProfileUpdateData, ProfileController.updateProfile);
router.get("/:id/rewards", ProfileController.getEarnedRewards);

export default router;
