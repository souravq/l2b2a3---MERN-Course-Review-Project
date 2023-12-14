// Create Course

import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (courseData: TCourse) => {
  try {
    const newCourse = await Course.create(courseData);
    return newCourse;
  } catch (err) {
    console.log(err);
  }
};

export const CourseService = {
  createCourseIntoDB,
};
