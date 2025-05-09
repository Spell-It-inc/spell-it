import { Router, Request, Response, RequestHandler } from "express";
import { ProfileController } from "../controllers/profileController";
import { validateProfileData } from "../middleware/profileValidator";

const router = Router();

type IdParam = { id: string };

const getAllProfilesHandler: RequestHandler = (req, res) =>
  ProfileController.getAllProfiles(req, res);
const getProfileByIdHandler: RequestHandler<IdParam> = (req, res) =>
  ProfileController.getProfileById(req, res);
const createProfileHandler: RequestHandler = (req, res) =>
  ProfileController.createProfile(req, res);
const updateProfileHandler: RequestHandler<IdParam> = (req, res) =>
  ProfileController.updateProfile(req, res);

router.get("/", getAllProfilesHandler);
router.get("/:id", getProfileByIdHandler);
router.post("/", validateProfileData, createProfileHandler);
router.put("/:id", validateProfileData, updateProfileHandler);

export default router;
