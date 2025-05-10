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
}
