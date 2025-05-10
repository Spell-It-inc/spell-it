import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { validateProfileData } from "../middleware/profileValidator";

const router = Router();

router.get("/", ProfileController.getEarnedRewards);
router.get("/:id", ProfileController.getProfileById);
router.post("/", validateProfileData, ProfileController.createProfile);
router.put("/:id", validateProfileData, ProfileController.updateProfile);
router.get("/:id/rewards", ProfileController.getEarnedRewards);

export default router;
