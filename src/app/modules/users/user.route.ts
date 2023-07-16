import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";


const router = express.Router();

router.post(
  "/signup",
  validateRequest(UserValidation?.createUserZodSchema),
  UserController.creatrUser
);
//login
router.post(
  "/login",
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser
);
//refreshToken
router.post(
  "/refresh-token",
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
);
// router.post(
//   "/wishlist",
//   UserController.enlistWishlist
// );




export const UserRoutes = router;
