import { z } from "zod";

// Define the Zod schema for TTag
const TagValidationSchema = z.object({
  name: z.string({ required_error: "Tag Name is required" }),
  isDeleted: z.boolean(),
});

// Define the Zod schema for TCourse
const CourseValidationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  instructor: z.string().optional(),
  categoryId: z
    .string()
    .uuid({ message: "Invalid Category ID" })
    .min(1, { message: "Category ID is required" }),
  price: z
    .number()
    .min(0, { message: "Price must be greater than or equal to 0" })
    .optional(),
  tags: z.array(TagValidationSchema).optional(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().min(1, { message: "End date is required" }),
  language: z.string().optional(),
  provider: z.string().optional(),
  details: z.object({
    level: z.enum(["Beginner", "Intermediate", "Advanced"]),
    description: z.string().optional(),
  }),
});

export default CourseValidationSchema;
