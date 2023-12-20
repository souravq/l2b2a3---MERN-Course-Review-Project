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

// Course Search and Filter
const courseSearchAndFilter = async (queryData: Record<string, unknown>) => {
  try {
    // Copy the query data
    const queryObject = { ...queryData }

    /* Which fields have to exclude */
    const excludeFields = [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'minPrice',
      'maxPrice',
      'startDate',
      'endDate',
      'level',
      'durationInWeeks',
    ]
    excludeFields.forEach((data) => delete queryObject[data])

    // If tag available
    if (typeof queryObject.tags === 'string') {
      queryObject.tags = new RegExp(queryObject.tags, 'i')
    }

    // If language available
    if (typeof queryObject.language === 'string') {
      queryObject.language = new RegExp(queryObject.language, 'i')
    }

    //If provider available
    if (typeof queryObject.provider === 'string') {
      queryObject.provider = new RegExp(queryObject.provider, 'i')
    }

    let query = Course.find({ ...queryObject })

    // If level available
    if (typeof queryData.level === 'string') {
      query = query.find({
        'details.level': new RegExp(queryData.level, 'i'),
      })
    }

    // If durationInWeeks available
    if (queryData.durationInWeeks) {
      query = query.find({ durationInWeeks: queryData.durationInWeeks })
    }

    // If Start Date and End date are available
    if (queryData.startDate && queryData.endDate) {
      query = query.find({
        $and: [
          { startDate: { $gte: queryData.startDate } },
          { endDate: { $lte: queryData.endDate } },
        ],
      })
    }

    // If minPrice and MaxPrice are Available
    if (queryData.minPrice && queryData.maxPrice) {
      query = query.find({
        price: { $gte: queryData.minPrice, $lte: queryData.maxPrice },
      })
    }

    // Sorting
    if (typeof queryData.sortBy === 'string') {
      const sortByValue = queryData.sortBy
      const allowSortFields = [
        'title',
        'price',
        'startDate',
        'endDate',
        'language',
        'durationInWeeks',
      ]
      if (allowSortFields.includes(sortByValue)) {
        if (queryData.sortOrder) {
          if (queryData.sortOrder === 'asc') {
            query = query.sort(sortByValue)
          } else if (queryData.sortOrder === 'desc') {
            query = query.sort(`-${sortByValue}`)
          }
        } else {
          query = query.sort(sortByValue)
        }
      }
    } else {
      query = query.sort({ createdAt: -1 })
    }

    // Pagination
    let page = 1
    let limit = 10

    if (typeof queryData.page === 'string') {
      page = parseInt(queryData.page) || 1
    }
    if (typeof queryData.limit === 'string') {
      limit = parseInt(queryData.limit) || 10
    }

    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    const result = await query.exec()
    return result
  } catch (err) {
    console.log(err)
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
  courseSearchAndFilter,
  updateCourseIntoDB,
  getCourseByIdWithReview,
  getBestCourse,
}
