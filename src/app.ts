/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/global.errorHandler";


const app: Application = express();

app.use(cors());
//parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// application
app.get("env");

app.use("/api/v1/", routes);

// global error handler
app.use(globalErrorHandler);
// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not found",
    errorMessages: [
      {
        path: req?.originalUrl,
        message: "API not found",
      },
    ],
  });
  next();
});

export default app;
