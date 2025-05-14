import { Router } from "express";
import { WordController } from "../controllers/wordController";
import { validateWordData } from "../middleware/wordValidator";

const router = Router();

router.get("/category/:categoryId", WordController.getAllByCategory);
router.post("/", validateWordData, WordController.createWord);

export default router;
