import { Model } from "mongoose";

export type IBooks = {
    title: string;
    author: string[];
    genre: string;
    publicationYear: number;
    publisher: {
      name: string;
      location: string;
    };
    reviews: {
      _id: string;
      user: string;
      comment: string;
    }[];
    rating: number;
    price: string | number;
    featured?: string;
  } & Document
  
  export type BookModel = Model<IBooks, Record<string, unknown>>;


  export type IBookFilter = {
    searchTerm?: string;
    genre?: string;
    publicationYear?: number;
    
  };
  