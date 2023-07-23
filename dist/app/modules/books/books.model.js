"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const BookSchema = new mongoose_2.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    reviews: { type: [String], required: false },
    email: { type: String, required: false },
    rating: { type: Number, required: false },
    price: { type: Number, required: true },
    featured: { type: String, required: false },
    coverImage: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const BooksL = (0, mongoose_1.model)('Books', BookSchema);
exports.default = BooksL;
