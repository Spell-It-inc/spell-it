import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router();

router.get("/:id", CategoryController.getCategoryById);

export default router;
