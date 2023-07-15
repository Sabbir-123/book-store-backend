import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

import { paginationFields } from '../../../constants/Paginationconstants'
import { bookStoreBookFilterableFields } from './books.constant'
import { IBooks } from './books.interface'
import { Bookervice } from './books.service'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createbook = catchAsync(async (req: Request, res: Response) => {
  const { title, author, genre, price, publicationYear } = req.body
  const accessToken = req.headers.authorization

  if (accessToken) {
    const decodedToken = jwtHelpers.verifyToken(
      accessToken,
      config.jwt.secret as Secret,
    )
    const { userEmail: email } = decodedToken
    console.log('hi', decodedToken)
    // Create a new cow object
    const newBook = {
      title,
      author,
      genre,
      publicationYear,
      price,
      email,
    }
    console.log(newBook)
    // Call the CowService createCow function with the new cow object
    const result = await Bookervice.createBook(newBook)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Book created successfully',
      data: result,
    })
  }
})

const getAllbooks = catchAsync(async (req: Request, res: Response) => {
  // searching, filtering and pagination
  const filters = pick(req?.query, bookStoreBookFilterableFields)
  const paginationOptions = pick(req?.query, paginationFields)

  const result = await Bookervice.getAllBooks(filters, paginationOptions)
  sendResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved Successfully',
    meta: result.meta,
    data: result.data,
  })
})

export const booksController = {
  getAllbooks,
  createbook,
}
