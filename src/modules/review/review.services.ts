// Create Review

import { TReview } from './review.interface'
import { Review } from './review.model'

const createReviewIntoDB = async (reviewData: TReview) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await Review.create(reviewData)
    return result
  } catch (err) {
    throw err
  }
}

export const reviewService = {
  createReviewIntoDB,
}
