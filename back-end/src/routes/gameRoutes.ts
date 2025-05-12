import { Router } from "express";
import { GameController } from "../controllers/gameController";

const router = Router();

router.get("/:gameId/categories/:categoryId/words", GameController.getWordsForGameCategory);
router.get("/:id/categories", GameController.getCategoriesForGame);
router.get("/:id", GameController.getGameById);
router.get("/", GameController.getAllGames);

export default router;