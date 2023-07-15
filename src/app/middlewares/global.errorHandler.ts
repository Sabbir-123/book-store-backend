/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";
import config from "../../config";
import { IGenericErrorMessage } from "../../Interfaces/error";
import handleValidationError from "../../error/handleValidationError";
import handleZodError from "../../error/handleZodError";
import handleCastError from "../../error/handleCastError";
import ApiError from "../../error/ApiError";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  config.env === "development"
    ? console.log("globalerror", err)
    : console.log("globalerror", err);

  let statusCode = 500;
  let message = "Something Went Wrong!!!";
  let errorMesages: IGenericErrorMessage[] = [];

  if (err?.name === "ValidationError") {
    // eslint-disable-next-line no-unused-vars
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMesages = simplifiedError?.errorMesages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMesages = simplifiedError?.errorMesages;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMesages = simplifiedError.errorMesages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMesages = err?.message
      ? [
          {
            path: " ",
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMesages = err?.message
      ? [
          {
            path: " ",
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMesages,
    stack: config.env !== "production" ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
