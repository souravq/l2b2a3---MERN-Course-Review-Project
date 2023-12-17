import express from 'express'
import { CourseController } from './course.controller'

const router = express.Router()

const updateRouter = express.Router()

router.post('/', CourseController.createCourse)

updateRouter.put('/:courseId', CourseController.updateCourse)

export const courseRouter = {
  router,
  updateRouter,
}
