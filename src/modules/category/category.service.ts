import { TCategory } from "./category.interface";
import { Category } from "./category.model";

// Create Category
const createCategoryIntoDB = async (categoryData: TCategory) => {
  try {
    console.log(categoryData);
    const result = await Category.create(categoryData);
    return result;
  } catch (err) {
    throw err;
  }
};

// Get All Category
const getAllCategory = async () => {
  try {
    const result = await Category.find({});
    return result;
  } catch (err) {
    throw err;
  }
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategory,
};
