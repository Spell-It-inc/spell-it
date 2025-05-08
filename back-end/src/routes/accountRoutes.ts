import { Router, RequestHandler } from "express";
import { AccountController } from "../controllers/accountController";

const router = Router();
type IdParam = { id: string };

const getAccountByIdHandler: RequestHandler<IdParam> = (req, res) =>
  AccountController.getAccountById(req, res);

router.get("/:id", getAccountByIdHandler);

export default router;
