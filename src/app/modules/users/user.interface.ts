import { Model } from "mongoose";

export type IUser = {
  id: string;
  password: string;
  role: string;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};

export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type ICowHutFilter = {
  searchTerm?: string;
};
