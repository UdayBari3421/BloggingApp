import { Router } from "express";
import { loginController, registerConroller } from "../Controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerConroller);
userRouter.post("/login", loginController);

export default userRouter;
