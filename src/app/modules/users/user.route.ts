import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/enums";

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

router.get("/users", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get("/users/my-profile", UserController.myProfile);
router.patch("/users/my-profile", UserController.myUpdateProfile);
router.patch(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation?.updateCowHutUserZodSchema),
  UserController.updateUser
);
router.delete(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteSingleUser
);
router.get(
  "/users/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

export const UserRoutes = router;
