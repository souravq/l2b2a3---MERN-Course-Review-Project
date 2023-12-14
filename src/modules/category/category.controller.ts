// Create Category

import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    // Get Category data
    const categoryData = req.body;
    const result = await CategoryService.createCategoryIntoDB(categoryData);
    if (result) {
      res.status(200).json({
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: {
          _id: result._id,
          name: result.name,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const CategoryController = {
  createCategory,
};
