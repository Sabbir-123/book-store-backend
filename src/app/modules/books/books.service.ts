import { SortOrder } from "mongoose";
import { IGenericResponse, IpaginationOptions } from "../../../Interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { bookStoreBookSearchableFields } from "./books.constant";
import { IBookFilter, IBooks } from "./books.interface";
import BooksL from "./books.model";
import ApiError from "../../../error/ApiError";

const getAllBooks = async (
    filters: IBookFilter,
    paginationOptions: IpaginationOptions
  ): Promise<IGenericResponse<IBooks[]>> => {
    const { searchTerm, genre, publicationYear, ...filtersData } = filters;
    const andCondition = [];
  
    // Dynamically searching
    if (searchTerm) {
      andCondition.push({
        $or: bookStoreBookSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }
  
    // Dynamically filtering
    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    // Add genre filter
    if (genre) {
      andCondition.push({ genre });
    }
  
    // Add publication year filter
    if (publicationYear) {
      andCondition.push({ publicationYear });
    }
  
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
  
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = await BooksL.find(whereCondition)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = await BooksL.countDocuments(whereCondition);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  


  const createBook = async (book: IBooks): Promise<IBooks | null> => {
   
    const createdBook = await BooksL.create(book);
    if (!createdBook) {
      throw new ApiError("Failed to create Book", 400);
    }
  
    return createdBook;
  };


  const getSingleBook = async (id: string): Promise<IBooks | null> => {
    const result = await BooksL.findById(id);
    return result;
  };
  
  const updateSingleBook = async (
    id: string,
    payload: Partial<IBooks>
  ): Promise<IBooks | null> => {
    const result = await BooksL.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
  
  const deleteBook = async (id: string): Promise<IBooks | null> => {
    const result = await BooksL.findOneAndDelete({ _id: id });
    return result;
  };



  export const BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    deleteBook
    
  };
  