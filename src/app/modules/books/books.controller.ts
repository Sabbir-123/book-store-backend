import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'

import { paginationFields } from '../../../constants/Paginationconstants'
import { bookStoreBookFilterableFields } from './books.constant'
import { IBooks } from './books.interface'
import { BookService } from './books.service'


const createbook = catchAsync(async (req: Request, res: Response) => {
  const { title, author, genre, price, publicationYear ,coverImage ,email} = req.body
 
 

    // Create a new Book object
    const newBook = {
      email,
      title,
      author,
      genre,
      publicationYear,
      coverImage,
      price
      
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

  const getReview = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookService.getReview(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      data: result,
    });
  });
  


  const updateBook = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(updatedData)
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

  const createReview = catchAsync(async (req, res) => {
    const comment = req.body.comment;
    const bookId = req.params.id;

    console.log( req.body,req.params.id );
  
    const result = await BookService.createReview(bookId, comment); 
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Review Posted Successfully",
      data: result,
    });
  });
  


export const booksController = {
  getAllbooks,
  createbook,
  getSinglebook,
  updateBook,
  deleteSingleBook,
  createReview,
  getReview
}
