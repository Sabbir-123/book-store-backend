import { model } from "mongoose";
import { Schema } from "mongoose";
import { BookModel, IBooks } from "./books.interface";

const BookSchema = new Schema<IBooks>({
    title: { type: String, required: true },
    author: { type: [String], required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    publisher: {
      name: { type: String, required: true },
      location: { type: String, required: true },
    },
    reviews: {
      type: [
        {
          _id: { type: String, required: true },
          user: { type: String, required: true },
          comment: { type: String, required: true },
        },
      ],
      required: true,
    },
    rating: { type: Number, required: true },
    price: { type: Schema.Types.Mixed, required: true },
    featured: { type: String, required: true },
  });


  const BooksL = model<IBooks, BookModel>("Books", BookSchema);
  export default BooksL

