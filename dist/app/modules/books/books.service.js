"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const books_constant_1 = require("./books.constant");
const books_model_1 = __importDefault(require("./books.model"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, genre, publicationYear } = filters, filtersData = __rest(filters, ["searchTerm", "genre", "publicationYear"]);
    const andCondition = [];
    // Dynamically searching
    if (searchTerm) {
        andCondition.push({
            $or: books_constant_1.bookStoreBookSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Dynamically filtering
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Add genre filter
    if (genre) {
        andCondition.push({ genre });
    }
    // Add publication year filter
    if (publicationYear) {
        andCondition.push({ publicationYear });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield books_model_1.default.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield books_model_1.default.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const createdBook = yield books_model_1.default.create(book);
    if (!createdBook) {
        throw new ApiError_1.default('Failed to create Book', 400);
    }
    return createdBook;
});
const createReview = (bookId, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_model_1.default.findOneAndUpdate({ _id: bookId }, { $push: { reviews: comment } }, // Add the comment directly to the reviews array
    { new: true });
    return book;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.findById(id);
    return result;
});
const getReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.findById(id).select({ _id: 1, reviews: 1 });
    return result;
});
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    deleteBook,
    createReview,
    getReview
};
