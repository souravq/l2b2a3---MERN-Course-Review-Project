import { Request, Response } from "express";
import { reviewService } from "./review.services";

const createReview = async (req: Request, res: Response) => {
  try {
    // Get review Data
    const reviewData = req.body;
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
    console.log(err);
  }
};

export const reviewController = {
  createReview,
};
