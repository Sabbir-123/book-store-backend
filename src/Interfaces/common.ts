import { IGenericErrorMessage } from "./error";

export type IgenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMesages: IGenericErrorMessage[];
};

export type IpaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
};
