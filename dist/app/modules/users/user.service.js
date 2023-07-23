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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const user_model_1 = require("./user.model");
const user_util_1 = require("./user.util");
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // auto generated incremental id
    const id = yield (0, user_util_1.generateUseId)(user.role);
    user.id = id;
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default("Failed to create User", 400);
    }
    return createdUser;
});
//login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //check user exist
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default("User not found", http_status_1.default.NOT_FOUND);
    }
    //match password
    if (isUserExist.password &&
        !(yield user.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default("Password is incorrect", http_status_1.default.UNAUTHORIZED);
    }
    const { email: userEmail, role } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, role }, index_1.default.jwt.secret, index_1.default.jwt.access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userEmail, role }, index_1.default.jwt.refresh_secret, index_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
//refresh token
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    //verify token
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, index_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default("Invalid Refresh Token", http_status_1.default.FORBIDDEN);
    }
    //check user exist
    const { userEmail } = verifiedToken;
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default("user not found", http_status_1.default.NOT_FOUND);
    }
    //create new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist.id, role: isUserExist.role }, index_1.default.jwt.secret, index_1.default.jwt.access_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const enlistWishlist = (bookId, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Update the user's wishlist array
        const updatedUser = yield user_model_1.User.findOneAndUpdate({ email: userEmail }, // Use userEmail as a query parameter
        { $push: { wishlist: bookId } }, { new: true });
        console.log(updatedUser);
        return { user: updatedUser };
    }
    catch (error) {
        throw new Error('Failed to add to wishlist');
    }
});
exports.UserService = {
    createUser,
    loginUser,
    refreshTokenService,
    // setWishlistedBooks,
    enlistWishlist
};
