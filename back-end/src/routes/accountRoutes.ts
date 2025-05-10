import { Router } from "express";
import { AccountController } from "../controllers/accountController";

const router = Router();

router.get("/:id", AccountController.getAccountById);
router.get("/:id/profiles", AccountController.getProfilesByAccountId);

export default router;
