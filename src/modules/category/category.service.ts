import { TCategory } from "./category.interface";
import { Category } from "./category.model";

// Create Category
const createCategoryIntoDB = async (categoryData: TCategory) => {
  try {
    const result = await Category.create(categoryData);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// Get All Category
const getAllCategory = async () => {
  try {
    const result = await Category.find({});
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategory,
};
