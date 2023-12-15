import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.services";
import reviewValidationSchema from "./review.validation";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get review Data
    const reviewData = req.body;
    // Apply ZOD validation
    const validateData = await reviewValidationSchema.parse(reviewData);
    // Call Review Service
    const result = await reviewService.createReviewIntoDB(reviewData);
    if (result) {
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Review created successfully",
        data: {
          _id: result._id,
          courseId: result.courseId,
          rating: result.rating,
          review: result.review,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const reviewController = {
  createReview,
};
