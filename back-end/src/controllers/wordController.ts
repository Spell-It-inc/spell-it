import { Request, Response } from "express";
import { WordModel } from "../models/word";

export class WordController {
  public static async getAllByCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const categoryId = parseInt(req.params.categoryId);

      if (isNaN(categoryId)) {
        res.status(400).json({ error: "Invalid category ID" });
      } else {
        const words = await WordModel.getAllByCategory(categoryId);
        res.json(words);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, word } = req.body;

      if (!categoryId || !word) {
        res.status(400).json({ error: "Category ID and word are required" });
      } else {
        const categoryIdNum = parseInt(categoryId);
        if (isNaN(categoryIdNum)) {
          res.status(400).json({ error: "Invalid category ID" });
        } else {
          const newWord = await WordModel.create(categoryId, word);
          res.status(201).json(newWord);
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
