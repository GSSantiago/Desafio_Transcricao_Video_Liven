import { Router } from 'express';
import userRoutes from "./user.route";

const router = Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router