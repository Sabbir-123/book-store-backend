"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        author: zod_1.z.string().nonempty({
            message: 'Author is required',
        }),
        genre: zod_1.z.string({
            required_error: 'Genre is required',
        }),
        publicationYear: zod_1.z.number({
            required_error: 'Publication year is required',
        }),
        coverImage: zod_1.z.string(),
        reviews: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        featured: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
    }),
});
const updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().nonempty().optional(),
        genre: zod_1.z.string().optional(),
        publicationYear: zod_1.z.number().optional(),
        reviews: zod_1.z.array(zod_1.z.string()).nonempty().optional(),
        rating: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        featured: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        coverImage: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    createBookZodSchema,
    updateBookZodSchema,
};
