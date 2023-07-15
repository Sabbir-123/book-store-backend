import mongoose from "mongoose";
import { IgenericErrorResponse } from "../Interfaces/common";
import { IGenericErrorMessage } from "../Interfaces/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IgenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err?.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return { path: el?.path, message: el?.message };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation Error",
    errorMesages: errors,
  };
};

export default handleValidationError;
