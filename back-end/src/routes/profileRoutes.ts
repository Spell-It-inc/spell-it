import { Router } from "express";
import { ProfileController } from "../controllers/profileController";
import { validateProfileData } from "../middleware/profileValidator";

const router = Router();

router.get("/", ProfileController.getAllProfiles);
router.get("/:id", ProfileController.getProfileById);
router.post("/", validateProfileData, ProfileController.createProfile);
router.put("/:id", validateProfileData, ProfileController.updateProfile);

export default router;
