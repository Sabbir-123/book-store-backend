import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";


const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(UserValidation?.createUserZodSchema),
  UserController.creatrUser
);
//login
router.post(
  "/auth/login",
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser
);
//refreshToken
router.post(
  "/auth/refresh-token",
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
);


export const UserRoutes = router;