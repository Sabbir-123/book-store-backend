import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { generateUseId } from "./user.util";
import config from "../../../config";
import { ILoginUserResponse, IRefreshTokenResponse } from "./user.interface";


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
    email: user.email,
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



export const UserController = {
  creatrUser,
  loginUser,
  refreshToken,
 
};
