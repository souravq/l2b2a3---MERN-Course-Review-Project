// Create Category

import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDB = async (categoryData: TCategory) => {
  try {
    const result = await Category.create(categoryData);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const CategoryService = {
  createCategoryIntoDB,
};
