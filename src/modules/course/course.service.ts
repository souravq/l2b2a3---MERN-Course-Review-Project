import { ObjectId } from 'mongodb'
import { TCourse } from './course.interface'
import { Course } from './course.model'
import { Review } from '../review/review.model'
import { updatedTags } from '../../utils/updatedTags'

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

//Get Course by ID with Reviews

const getCourseByIdWithReview = async (courseId: string) => {
  try {
    // Get Course Data
    const courseData = await Course.findById({
      _id: new ObjectId(courseId),
    })

    if (!courseData) {
      throw new Error('Course not found')
    }

    // Get Review Data
    const reviewResult = await Review.find({ courseId })

    const exactReviewResult =
      reviewResult &&
      reviewResult.map((result) => {
        return {
          courseId: result.courseId,
          rating: result.rating,
          review: result.review,
        }
      })

    // Merge two result
    const result = {
      course: {
        _id: courseData?._id,
        title: courseData?.title,
        instructor: courseData?.instructor,
        categoryId: courseData?.categoryId,
        price: courseData?.price,
        tags: courseData && updatedTags(courseData?.tags),
        startDate: courseData?.startDate,
        endDate: courseData?.endDate,
        language: courseData?.language,
        provider: courseData?.provider,
        details: courseData?.details,
      },
      reviews: exactReviewResult,
    }
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

// Get the Best Course

const getBestCourse = async () => {
  try {
    const bestCourseResult = await Review.aggregate([
      {
        $group: {
          _id: '$courseId',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          averageRating: -1,
        },
      },
      {
        $limit: 1,
      },
    ])

    if (!bestCourseResult) {
      throw new Error('Rating not found')
    }

    // Getting Course Id
    const courseId = bestCourseResult[0]._id

    // Fetch Course Data
    const courseData = await Course.findById({ _id: courseId })

    //Expected Result
    const result = {
      course: {
        _id: courseData?._id,
        title: courseData?.title,
        instructor: courseData?.instructor,
        categoryId: courseData?.categoryId,
        price: courseData?.price,
        tags: courseData && updatedTags(courseData?.tags),
        startDate: courseData?.startDate,
        endDate: courseData?.endDate,
        language: courseData?.language,
        provider: courseData?.provider,
        details: courseData?.details,
      },
      averageRating: bestCourseResult[0].averageRating,
      reviewCount: bestCourseResult[0].reviewCount,
    }
    return result
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const CourseService = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getCourseByIdWithReview,
  getBestCourse,
}
