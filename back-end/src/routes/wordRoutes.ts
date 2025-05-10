import { Router } from "express";
import { WordController } from "../controllers/wordController";

const router = Router();

router.get("/category/:categoryId", WordController.getAllByCategory);
router.post("/", WordController.createWord);

export default router;
