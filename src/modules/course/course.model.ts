// 2. Create a Schema corresponding to the document interface.

import { Schema, model } from "mongoose";
import { TCourse, TTag } from "./course.interface";

const TagSchema = new Schema<TTag>({
  name: { type: String },
  isDeleted: { type: Boolean },
});

const CourseSchema = new Schema<TCourse>({
  title: { type: String, required: true, unique: true },
  instructor: { type: String },
  categoryId: { type: Schema.Types.ObjectId },
  price: { type: Number },
  tags: { type: [TagSchema] },
  startDate: { type: String },
  endDate: { type: String },
  language: { type: String },
  provider: { type: String },
  details: {
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    description: {
      type: String,
    },
  },
});

// 3. Create a Model.

export const Course = model<TCourse>("Course", CourseSchema);
