import { Router } from "express";
import userRoutes from "./user.route";
import transcriptionRoutes from "./transcription.route";

const router = Router();

const defaultRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/transcription",
    route: transcriptionRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
