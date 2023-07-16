import { model } from "mongoose";
import { Schema } from "mongoose";
import { BookModel, IBooks } from "./books.interface";

const BookSchema = new Schema<IBooks>({
    title: { type: String, required: true },
    author: { type: [String], required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    reviews: {
      type: [
        {
          _id: { type: String, required: false },
          user: { type: String, required: false },
          comment: { type: String, required: false },
        },
      ],
      required: false,
    },
    email: { type: String, required: false },
    rating: { type: Number, required: false },
    price: { type: Number, required: true },
    featured: { type: String, required: false }, // Make featured field optional with required: false
    coverImage: { type: String, required: false }, // Add coverImage field as a string with required: false

  });
  

  const BooksL = model<IBooks, BookModel>("Books", BookSchema);
  export default BooksL

