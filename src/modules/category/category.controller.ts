import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";
import { TCategory } from "./category.interface";
import categoryValidationSchema from "./category.validation";

// Create Category
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get Category data
    const categoryData: TCategory = req.body;
    // Apply Zod Validation
    const validateCategoryData = await categoryValidationSchema.parse(
      categoryData
    );
    const result = await CategoryService.createCategoryIntoDB(
      validateCategoryData
    );
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
    next(err);
  }
};

// Get All category

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(err);
  }
};

export const CategoryController = {
  createCategory,
  getAllCategory,
};
