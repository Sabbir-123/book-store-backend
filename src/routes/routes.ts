import express from "express";
import { UserRoutes } from "../app/modules/users/user.route";
import { BookRoutes } from "../app/modules/books/books.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/auth/user/",
    route: UserRoutes,
  },
  {
    path: "/books/",
    route: BookRoutes,
  },
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
