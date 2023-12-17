import { ObjectId } from 'mongodb'
// Create Course

import { TCourse } from './course.interface'
import { Course } from './course.model'

// Create Course
const createCourseIntoDB = async (courseData: TCourse) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCourse = await Course.create(courseData)
    return newCourse
  } catch (err) {
    throw err
  }
}

// Update Course
const updateCourseIntoDB = async (courseId: string, courseData: TCourse) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { details, ...remainingField } = courseData

    const modifiedData: Record<string, unknown> = { ...remainingField }

    if (details && Object.keys(details).length > 0) {
      for (const [keys, value] of Object.entries(details)) {
        modifiedData[`details.${keys}`] = value
      }
    }
    const result = await Course.findOneAndUpdate(
      { _id: new ObjectId(courseId) },
      { $set: modifiedData },
      { new: true, runValidators: true },
    )
    return result
  } catch (err) {
    throw err
  }
}

export const CourseService = {
  createCourseIntoDB,
  updateCourseIntoDB,
}
