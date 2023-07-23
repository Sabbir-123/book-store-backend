import express from 'express'

import { booksController } from './books.controller'
import validateRequest from '../../middlewares/validateRequest'
import { BookValidation } from './books.validation'

const router = express.Router()

router.post(
  '/new-book',
  validateRequest(BookValidation?.createBookZodSchema),

  booksController.createbook,
)
router.post('/new-review/:id', booksController.createReview)

router.get(
  '/all-books',

  booksController.getAllbooks,
)
router.patch(
  '/book/:id',
  validateRequest(BookValidation?.updateBookZodSchema),

  booksController.updateBook,
)

router.delete('/book/:id', booksController.deleteSingleBook)
router.get(
  '/book/:id',

  booksController.getSinglebook,
)
router.get(
  '/book/review/:id',

  booksController.getReview
)

export const BookRoutes = router
