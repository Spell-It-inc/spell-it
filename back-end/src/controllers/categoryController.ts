import type { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../models/category";
import { ensureExists, validateId } from "../utils/validators";

export class CategoryController {
  static async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = validateId(req.params.id, "Category ID");

      const category = ensureExists(await CategoryModel.findById(categoryId), "Category")

      res.json(category);
    } catch (error) {
      next(error);
    }
  }

  public static async getCategoryWithWords(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categoryId = validateId(req.params.id, "Category ID");
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 3;

      const categoryWithWords = ensureExists(await CategoryModel.findWithWordsById(
        categoryId,
        page,
        limit
      ), "Category");

      res.json(categoryWithWords);
    } catch (error) {
      next(error);
    }
  }

  public static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}
