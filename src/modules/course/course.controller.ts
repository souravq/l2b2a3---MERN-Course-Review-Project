import { NextFunction, Request, Response } from 'express'
import { CourseService } from './course.service'
import calculateDurationInWeeks from '../../utils/durationInWeeks'
import { CourseResponse } from '../../types/course.types'
//import CourseValidationSchema from './course.validation'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

// Create Course
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

    // Calculate Duration In Week
    let week = 0
    if (courseData.startDate && courseData.endData) {
      week = calculateDurationInWeeks(courseData.startDate, courseData.endDate)
      courseData['durationInWeeks'] = week
    }

    // Call Service function
    const result = await CourseService.createCourseIntoDB(courseData)

    if (result) {
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

// Course Search And Filter

const courseSearchAndFilter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const searchData = { ...req.query }
    const result = await CourseService.courseSearchAndFilter(searchData)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Courses retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
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

//Get Course by ID with Reviews

const getCourseByIdWithReview = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const courseId = req.params.courseId
    const result = await CourseService.getCourseByIdWithReview(courseId)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Course and Reviews retrieved successfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

// Get Best Course

const getBestCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CourseService.getBestCourse()
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Best course retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

export const CourseController = {
  createCourse,
  courseSearchAndFilter,
  updateCourse,
  getCourseByIdWithReview,
  getBestCourse,
}
