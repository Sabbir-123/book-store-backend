import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.array(z.string()).nonempty({
      message: 'Author is required',
    }),
    genre: z.string({
      required_error: 'Genre is required',
    }),
    publicationYear: z.number({
      required_error: 'Publication year is required',
    }),

    reviews: z
      .array(
        z
          .object({
            _id: z
              .string({
                required_error: 'Review ID is required',
              })
              .optional(),
            user: z
              .string({
                required_error: 'Review user is required',
              })
              .optional(),
            comment: z
              .string({
                required_error: 'Review comment is required',
              })
              .optional(),
          })
          .optional(),
      )
      .optional(),
    rating: z.number().optional(),
    price: z.number({
      required_error: 'Price is required',
    }),
    featured: z.string().optional(),
    email: z.string().optional(),
    coverImage: z.string().optional(),
  }),
})

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.array(z.string()).nonempty().optional(),
    genre: z.string().optional(),
    publicationYear: z.number().optional(),
    reviews: z
      .array(
        z.object({
          _id: z.string().optional(),
          user: z.string().optional(),
          comment: z.string().optional(),
        }),
      )
      .optional(),
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
