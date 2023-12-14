import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>({
  courseId: { type: Schema.Types.ObjectId },
  rating: { type: Number },
  review: { type: String },
});

export const Review = model<TReview>("Review", ReviewSchema);
