import express from "express";

import { booksController } from "./books.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./books.validation";


const router = express.Router();

router.post(
  "/new-book",
  validateRequest(BookValidation?.createBookZodSchema),

  booksController.createbook
);

router.get(
  "/all-books",
  
  booksController.getAllbooks
);
// router.patch(
//   "/books/:id",
//   validateRequest(bookValidation?.updatebookZodSchema),

//   booksController.updatebook
// );
// router.delete(
//   "/books/:id",
//   booksController.deleteSinglebook
// );
// router.get(
//   "/books/:id",

//   booksController.getSinglebook
// );

export const BookRoutes = router;
