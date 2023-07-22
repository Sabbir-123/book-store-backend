/* eslint-disable no-unused-vars */
import { Model } from "mongoose";



export type IUser = {
  id: string;
  password: string;
  role: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  address: string;
  money: number;
  wishlist?: string[];
  currentlyReading?:string;
  finishedBooks?:string[];
};

export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilter = {
  searchTerm?: string;
};


export type ILoginUser = {
  email: string;
  password: string;
  role: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
