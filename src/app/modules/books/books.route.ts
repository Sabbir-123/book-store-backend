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
router.patch(
  "/book/:id",
  validateRequest(BookValidation?.updateBookZodSchema),

  booksController.updateBook
);



router.delete(
  "/book/:id",
  booksController.deleteSingleBook
);
router.get(
  "/book/:id",

  booksController.getSinglebook
);

export const BookRoutes = router;
