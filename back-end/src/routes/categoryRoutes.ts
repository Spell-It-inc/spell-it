import { Router } from "express";
import { CategoryController } from "../controllers/categoryController";

const router = Router();

router.get("/:id", CategoryController.getCategoryById);
router.get("/:id/words", CategoryController.getCategoryWithWords);

export default router;
