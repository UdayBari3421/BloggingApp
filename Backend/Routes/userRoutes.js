import { Router } from "express";
import { loginController, registerConroller } from "../Controllers/UserController.js";

const userRouter = Router();

userRouter.post("/register", registerConroller);
userRouter.post("/login", loginController);

export default userRouter;
