"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = __importDefault(require("../../error/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../error/handleZodError"));
const handleCastError_1 = __importDefault(require("../../error/handleCastError"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const globalErrorHandler = (err, req, res, next) => {
    config_1.default.env === "development"
        ? console.log("globalerror", err)
        : console.log("globalerror", err);
    let statusCode = 500;
    let message = "Something Went Wrong!!!";
    let errorMesages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        // eslint-disable-next-line no-unused-vars
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMesages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMesages;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMesages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMesages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMesages = simplifiedError.errorMesages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMesages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: " ",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof mongoose_1.Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMesages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: " ",
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMesages,
        stack: config_1.default.env !== "production" ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
