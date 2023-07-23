"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./books.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const books_validation_1 = require("./books.validation");
const router = express_1.default.Router();
router.post('/new-book', (0, validateRequest_1.default)(books_validation_1.BookValidation === null || books_validation_1.BookValidation === void 0 ? void 0 : books_validation_1.BookValidation.createBookZodSchema), books_controller_1.booksController.createbook);
router.post('/new-review/:id', books_controller_1.booksController.createReview);
router.get('/all-books', books_controller_1.booksController.getAllbooks);
router.patch('/book/:id', (0, validateRequest_1.default)(books_validation_1.BookValidation === null || books_validation_1.BookValidation === void 0 ? void 0 : books_validation_1.BookValidation.updateBookZodSchema), books_controller_1.booksController.updateBook);
router.delete('/book/:id', books_controller_1.booksController.deleteSingleBook);
router.get('/book/:id', books_controller_1.booksController.getSinglebook);
router.get('/book/review/:id', books_controller_1.booksController.getReview);
exports.BookRoutes = router;
