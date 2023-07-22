import { Model } from "mongoose";

export type IBooks = {
    title: string;
    author: string;
    genre: string;
    publicationYear: number;
    reviews?: {
      _id: string;
      user: string;
      comment: string;
    }[];
    rating?: number;
    price:  number;
    featured?: string;
    email?: string;
    coverImage: string;
    

  } 
  
  export type BookModel = Model<IBooks, Record<string, unknown>>;


  export type IBookFilter = {
    searchTerm?: string;
    genre?: string;
    publicationYear?: number;
    
  };
  