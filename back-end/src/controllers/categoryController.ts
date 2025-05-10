import type { Request, Response } from "express";
import { CategoryModel } from "../models/category";

export class CategoryController {
  static async getCategoryById(req: Request, res: Response) {
    try {
      const categoryId = parseInt(req.params.id);

      if (isNaN(categoryId) || categoryId <= 0) {
        res.status(400).json({ error: "Invalid Category ID" });
      } else {
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
          res.status(404).json({ error: "Category not found" });
        } else {
          res.json(category);
        }
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  }

  public static async getCategoryWithWords(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const categoryId = parseInt(req.params.id);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 3;

      if (isNaN(categoryId)) {
        res.status(400).json({ error: "Invalid category ID" });
        return;
      }

      const categoryWithWords = await CategoryModel.findWithWordsById(
        categoryId,
        page,
        limit
      );

      if (!categoryWithWords) {
        res.status(404).json({ error: "Category not found" });
        return;
      }

      res.json(categoryWithWords);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
