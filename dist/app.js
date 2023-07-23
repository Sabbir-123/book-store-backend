"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./routes/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const global_errorHandler_1 = __importDefault(require("./app/middlewares/global.errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// application
app.get("env");
app.use("/api/v1/", routes_1.default);
// global error handler
app.use(global_errorHandler_1.default);
// handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not found",
        errorMessages: [
            {
                path: req === null || req === void 0 ? void 0 : req.originalUrl,
                message: "API not found",
            },
        ],
    });
    next();
});
exports.default = app;
