import { model } from 'mongoose'
import { Schema } from 'mongoose'
import { BookModel, IBooks } from './books.interface'

const BookSchema = new Schema<IBooks>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number , required: true },
    reviews: { type: [String], required: false },
    email: { type: String, required: false },
    rating: { type: Number, required: false },
    price: { type: Number, required: true },
    featured: { type: String, required: false },
    coverImage: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

const BooksL = model<IBooks, BookModel>('Books', BookSchema)
export default BooksL
