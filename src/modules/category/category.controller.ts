import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { TCategory } from "./category.interface";

// Create Category
const createCategory = async (req: Request, res: Response) => {
  try {
    // Get Category data
    const categoryData: TCategory = req.body;
    const result = await CategoryService.createCategoryIntoDB(categoryData);
    if (result) {
      res.status(201).json({
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

// Get All category

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.getAllCategory();
    if (result) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: result.map((data) => {
          return {
            _id: data._id,
            name: data.name,
          };
        }),
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategory,
};
