"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errors = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: "Invalid Id",
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Cast Error",
        errorMesages: errors,
    };
};
exports.default = handleCastError;
