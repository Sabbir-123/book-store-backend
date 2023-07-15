import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.array(z.string()).nonempty({
        message: "Author is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publicationYear: z.number({
      required_error: "Publication year is required",
    }),
    
    reviews: z.array(
      z.object({
        _id: z.string({
          required_error: "Review ID is required",
        }).optional(),
        user: z.string({
          required_error: "Review user is required",
        }).optional(),
        comment: z.string({
          required_error: "Review comment is required",
        }).optional(),
      }).optional()
    ).optional(),
    rating: z.number().optional(),
    price: z.number({
      required_error: "Price is required",
    }),
    featured: z.string().optional(),
    email: z.string().optional(),
    wishlist: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    currentlyReading: z.string().optional(),
    finishedBooks: z.array(z.string()).optional(),
  }),
});

export const BookValidation = {
    createBookZodSchema
 
};
