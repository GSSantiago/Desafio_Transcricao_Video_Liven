import { Router } from "express";
import * as userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.post("/", userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
