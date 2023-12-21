import { ObjectId } from 'mongodb'
import { z } from 'zod'

// Define the Zod schema for TTag
const TagValidationSchema = z.object({
  name: z.string({ required_error: 'Tag Name is required' }),
  isDeleted: z.boolean({ required_error: 'Tag isDeleted is required' }),
})

// Define the Zod schema for TCourse
const CourseValidationSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  instructor: z.string({ required_error: 'Instructor is required' }),
  categoryId: z.string().refine((value) => ObjectId.isValid(value), {
    message: 'Category ID must be a valid ObjectId',
  }),
  price: z
    .number()
    .min(0, { message: 'Price must be greater than or equal to 0' }),
  tags: z.array(TagValidationSchema),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  language: z.string({ required_error: 'Language is required' }),
  provider: z.string({ required_error: 'Provider is required' }),
  durationInWeeks: z.number(),
  details: z.object({
    level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    description: z.string({
      required_error: 'Details description is required',
    }),
  }),
})

export default CourseValidationSchema
