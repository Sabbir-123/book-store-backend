"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../app/modules/users/user.route");
const books_route_1 = require("../app/modules/books/books.route");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/auth/user/",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/books/",
        route: books_route_1.BookRoutes,
    },
];
moduleRoute.forEach((route) => {
    router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route);
});
exports.default = router;
