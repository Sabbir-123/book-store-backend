"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.default)(user_validation_1.UserValidation === null || user_validation_1.UserValidation === void 0 ? void 0 : user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.creatrUser);
//login
router.post("/login", (0, validateRequest_1.default)(user_validation_1.UserValidation.loginZodSchema), user_controller_1.UserController.loginUser);
//refreshToken
router.post("/refresh-token", (0, validateRequest_1.default)(user_validation_1.UserValidation.refreshTokenZodSchema), user_controller_1.UserController.refreshToken);
router.post("/wishlist/", user_controller_1.UserController.enlistWishlist);
exports.UserRoutes = router;
