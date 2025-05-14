import { NextFunction, Request, Response } from "express";
import { WordModel } from "../models/word";
import { ensureExists, validateExistsInDB, validateId } from "../utils/validators";
import { handleDatabaseError } from "../utils/handleDatabaseError";

export class WordController {
  public static async getAllByCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryId = validateId(req.params.categoryId, "Category ID");

      const words = ensureExists(await WordModel.findAllByCategory(categoryId), "Words");

      res.json(words);
    } catch (error) {
      next(error);
    }
  }

  public static async createWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category_id, word } = req.body;

      const categoryId = parseInt(category_id, 10);

      await validateExistsInDB("categories", "category_id", categoryId, "Category");

      const newWord = await WordModel.create(categoryId, word);

      res.status(201).json(newWord);

    } catch (error: any) {
      next(handleDatabaseError(error));
    }
  }
}
