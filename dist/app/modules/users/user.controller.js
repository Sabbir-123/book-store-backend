"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const config_1 = __importDefault(require("../../../config"));
const user_util_1 = require("./user.util");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
// import { BookService } from '../books/books.service'
// import { IBooks } from '../books/books.interface'
// import { jwtHelpers } from '../../../helpers/jwtHelpers'
// import { Secret } from 'jsonwebtoken'
const creatrUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    // Generate user ID based on the role
    const userId = yield (0, user_util_1.generateUseId)(user.role);
    // Create a new user object with the generated ID
    const newUser = {
        id: userId,
        password: user.password,
        role: user.role,
        name: user.name,
        email: user.email,
        address: user.address,
        money: user.money,
    };
    console.log(newUser);
    // Call the UserService createUser function with the new user object
    const result = yield user_service_1.UserService.createUser(newUser);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User created Successfully',
        data: result,
    });
}));
//login user
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logInData = __rest(req.body, []);
    const result = yield user_service_1.UserService.loginUser(logInData);
    const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
    const cookiesOptions = {
        httpOnly: true,
        secure: config_1.default.env === 'production',
    };
    res.cookie('refreshToken', refreshToken, cookiesOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User logged in successfully',
        data: others,
    });
}));
//refresh token
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield user_service_1.UserService.refreshTokenService(refreshToken);
    const cookiesOptions = {
        httpOnly: true,
        secure: config_1.default.env === 'production',
    };
    res.cookie('refreshToken', refreshToken, cookiesOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'New access token generated successfully',
        data: result,
    });
}));
const enlistWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bookId = req.body.id;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[0];
    const decodedToken = jwtHelpers_1.jwtHelpers.decodeToken(accessToken);
    const { userEmail } = decodedToken;
    console.log(decodedToken);
    const result = yield user_service_1.UserService.enlistWishlist(bookId, userEmail);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book Wishlisted Successfully",
        data: result,
    });
}));
exports.UserController = {
    creatrUser,
    loginUser,
    refreshToken,
    enlistWishlist
};
