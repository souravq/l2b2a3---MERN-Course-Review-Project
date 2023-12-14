import { Request, Response } from "express";
import { CourseService } from "./course.service";
import calculateDurationInWeeks from "../../utils/durationInWeeks";
import { CourseResponse } from "../../types/course.types";

const createCourse = async (req: Request, res: Response) => {
  try {
    // Getting Body Data
    const courseData = req.body;
    // Call Service function
    const result = await CourseService.createCourseIntoDB(courseData);

    if (result) {
      // Calculate Duration In Week
      const week =
        result && calculateDurationInWeeks(result.startDate, result.endDate);

      // Get expected tags
      const newTags =
        result &&
        result.tags.map((data) => {
          return {
            name: data.name,
            isDeleted: data.isDeleted,
          };
        });

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
      };
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: resultData,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const CourseController = {
  createCourse,
};
