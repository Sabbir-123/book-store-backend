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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const Paginationconstants_1 = require("../../../constants/Paginationconstants");
const books_constant_1 = require("./books.constant");
const books_service_1 = require("./books.service");
const createbook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, genre, price, publicationYear, coverImage, email } = req.body;
    // Create a new Book object
    const newBook = {
        email,
        title,
        author,
        genre,
        publicationYear,
        coverImage,
        price
    };
    console.log(newBook);
    // Call the BookService createBook function with the new Book object
    const result = yield books_service_1.BookService.createBook(newBook);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Book created successfully',
        data: result,
    });
}));
const getAllbooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // searching, filtering and pagination
    const filters = (0, pick_1.default)(req === null || req === void 0 ? void 0 : req.query, books_constant_1.bookStoreBookFilterableFields);
    const paginationOptions = (0, pick_1.default)(req === null || req === void 0 ? void 0 : req.query, Paginationconstants_1.paginationFields);
    const result = yield books_service_1.BookService.getAllBooks(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Books retrieved Successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getSinglebook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.getSingleBook(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book retrieved Successfully",
        data: result,
    });
}));
const getReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.getReview(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    console.log(updatedData);
    const result = yield books_service_1.BookService.updateSingleBook(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book Updated Successfully",
        data: result,
    });
}));
const deleteSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_service_1.BookService.deleteBook(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Book Deleted Successfully",
        data: result,
    });
}));
const createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = req.body.comment;
    const bookId = req.params.id;
    console.log(req.body, req.params.id);
    const result = yield books_service_1.BookService.createReview(bookId, comment);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Review Posted Successfully",
        data: result,
    });
}));
exports.booksController = {
    getAllbooks,
    createbook,
    getSinglebook,
    updateBook,
    deleteSingleBook,
    createReview,
    getReview
};
