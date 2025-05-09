import { Router, RequestHandler } from "express";
import { AccountController } from "../controllers/accountController";

const router = Router();
type IdParam = { id: string };

const getAccountByIdHandler: RequestHandler<IdParam> = (req, res) =>
  AccountController.getAccountById(req, res);

const getProfilesAccountByIdHandler: RequestHandler<IdParam> = (req, res) =>
  AccountController.getProfilesByAccountId(req, res);

router.get("/:id", getAccountByIdHandler);
router.get("/:id/profiles", getProfilesAccountByIdHandler);

export default router;
