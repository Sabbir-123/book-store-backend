import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string().nonempty({
      message: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }),
    coverImage: z.string(),

    reviews: z.string().optional(),
    rating: z.number().optional(),
    price: z.number({
      required_error: 'Price is required',
    }),
    featured: z.string().optional(),
    email: z.string().optional(),

  }),
})

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().nonempty().optional(),
    genre: z.string().optional(),
    publicationYear: z.number().optional(),
    reviews:z.array(z.string()).nonempty().optional(),
    rating: z.number().optional(),
    price: z.number().optional(),
    featured: z.string().optional(),
    email: z.string().optional(),
    coverImage: z.string().optional(),
  }),
})

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
}
