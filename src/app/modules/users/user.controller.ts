import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { generateUseId } from "./user.util";
import pick from "../../../shared/pick";
import { cowHutUserFilterableFields } from "./user.constant";
import { paginationFields } from "../../../constants/Paginationconstants";
import { IUser } from "./user.interface";
import config from "../../../config";
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
} from "../admin/admin.interface";

const creatrUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;

  // Generate user ID based on the role
  const userId = await generateUseId(user.role);

  // Create a new user object with the generated ID
  const newUser = {
    id: userId,
    password: user.password,
    role: user.role,
    name: user.name,
    phoneNumber: user.phoneNumber,
    address: user.address,
    budget: user.budget,
    income: user.income,
  };

  // Call the UserService createUser function with the new user object
  const result = await UserService.createUser(newUser);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created Successfully",
    data: result,
  });
});

//login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;
  const result = await UserService.loginUser(logInData);
  const { refreshToken, ...others } = result;

  const cookiesOptions = {
    httpOnly: true,
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: others,
  });
});

//refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshTokenService(refreshToken);

  const cookiesOptions = {
    httpOnly: true,
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // searching, filtering and pagination
  const filters = pick(req?.query, cowHutUserFilterableFields);
  const paginationOptions = pick(req?.query, paginationFields);

  const result = await UserService.getAllUsers(filters, paginationOptions);
  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User retrieved Successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await UserService.updateSingleUser(id, updatedData);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated Successfully",
    data: result,
  });
});

const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted Successfully",
    data: result,
  });
});

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[0]; // Assuming the access token is provided in the "Authorization" header
  const result = await UserService.myProfile(accessToken as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });
});

const myUpdateProfile = catchAsync(async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization?.split(" ")[0]; // Assuming the access token is provided in the "Authorization" header
  const updatedData = req.body;
  const result = await UserService.myUpdateProfile(
    accessToken as string,
    updatedData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information Updated successfully",
    data: result,
  });
});

export const UserController = {
  creatrUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteSingleUser,
  loginUser,
  refreshToken,
  myProfile,
  myUpdateProfile,
};
