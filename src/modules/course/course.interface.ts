// 1. Create an interface representing a document in MongoDB.

import { ObjectId } from 'mongodb'

// Tag Interface
export type TTag = {
  name: string
  isDeleted: boolean
}

//Course Interface
export type TCourse = {
  title: string
  instructor: string
  categoryId: ObjectId
  price: number
  tags: TTag[]
  startDate: string
  endDate: string
  language: string
  provider: string
  durationInWeeks: number
  details: {
    level: 'Beginner' | 'Intermediate' | 'Advanced'
    description: string
  }
}
