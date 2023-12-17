import { NextFunction, Request, Response } from 'express'
import { CourseService } from './course.service'
import calculateDurationInWeeks from '../../utils/durationInWeeks'
import { CourseResponse } from '../../types/course.types'
//import CourseValidationSchema from './course.validation'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Getting Body Data
    const courseData = req.body
    // Apply Zod Validation
    //const validateCourseData = await CourseValidationSchema.parse(courseData)
    // Call Service function
    const result = await CourseService.createCourseIntoDB(courseData)

    if (result) {
      // Calculate Duration In Week
      const week =
        result && calculateDurationInWeeks(result.startDate, result.endDate)

      // Get expected tags
      const newTags =
        result &&
        result.tags.map((data) => {
          return {
            name: data.name,
            isDeleted: data.isDeleted,
          }
        })

      // Extract needed data from result
      const resultData: CourseResponse = {
        _id: result._id,
        title: result.title,
        instructor: result.instructor,
        categoryId: result.categoryId,
        price: result.price,
        tags: newTags,
        startDate: result.startDate,
        endDate: result.endDate,
        language: result.language,
        provider: result.provider,
        durationInWeeks: week, // calculated from the start and end dates
        details: result.details,
      }

      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course created successfully',
        data: resultData,
      })
    }
  } catch (err) {
    next(err)
  }
}

//Course Update

const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get Course Id
    const courseId = req.params.courseId
    // Get updated body data
    const updatedData = req.body
    const result = await CourseService.updateCourseIntoDB(courseId, updatedData)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course updated successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const CourseController = {
  createCourse,
  updateCourse,
}
