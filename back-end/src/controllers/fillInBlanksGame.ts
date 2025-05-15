import type { NextFunction, Request, Response } from "express";
import { WordModel } from "../models/word";

export class CategoryController {
  static async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const word = await WordModel.findAllByCategory(1);
      console.log("word", word);
      res.status(200).json(word);
    } catch (error) {
      next(error);
    }
  }
}
