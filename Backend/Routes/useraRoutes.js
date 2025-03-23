import { Router } from "express";
import { loginController, registerConroller } from "../Controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", registerConroller);
userRouter.get("/login", loginController);

export default userRouter;
