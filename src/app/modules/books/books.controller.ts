import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

import { paginationFields } from '../../../constants/Paginationconstants'
import { bookStoreBookFilterableFields } from './books.constant'
import { IBooks } from './books.interface'
import { BookService } from './books.service'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

const createbook = catchAsync(async (req: Request, res: Response) => {
  const { title, author, genre, price, publicationYear ,coverImage,reviews } = req.body
  const accessToken = req.headers.authorization

  if (accessToken) {
    const decodedToken = jwtHelpers.verifyToken(
      accessToken,
      config.jwt.secret as Secret,
    )
    const { userEmail: email } = decodedToken

    // Create a new Book object
    const newBook = {
      title,
      author,
      genre,
      publicationYear,
      coverImage,
      price,
      email,
      reviews
    }
    console.log(newBook)
    // Call the BookService createBook function with the new Book object
    const result = await BookService.createBook(newBook)

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

  const result = await BookService.getAllBooks(filters, paginationOptions)
  sendResponse<IBooks[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Books retrieved Successfully',
    meta: result.meta,
    data: result.data,
  })
})


const getSinglebook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.getSingleBook(id);
    sendResponse<IBooks>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Book retrieved Successfully",
      data: result,
    });
  });



  const updateBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await BookService.updateSingleBook(id, updatedData);
    sendResponse<IBooks>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Updated Successfully",
      data: result,
    });
  });
  
  const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.deleteBook(id);
    sendResponse<IBooks>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book Deleted Successfully",
      data: result,
    });
  }); 




export const booksController = {
  getAllbooks,
  createbook,
  getSinglebook,
  updateBook,
  deleteSingleBook
}
