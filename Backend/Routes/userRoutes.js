import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/UserController.js";

const userRouter = Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.delete("/logout", logoutController);

export default userRouter;
