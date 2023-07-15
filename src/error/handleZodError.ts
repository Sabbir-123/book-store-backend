import { ZodError, ZodIssue } from "zod";
import { IgenericErrorResponse } from "../Interfaces/common";
import { IGenericErrorMessage } from "../Interfaces/error";

const handleZodError = (err: ZodError): IgenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue?.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMesages: errors,
  };
};

export default handleZodError;
