import express from "express";
import { UserRoutes } from "../app/modules/users/user.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/v1/auth/",
    route: UserRoutes,
  }
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
