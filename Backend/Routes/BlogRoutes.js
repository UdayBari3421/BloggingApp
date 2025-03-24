import { Router } from "express";
import { createBlog } from "../Controllers/blogContoller.js";
import authUser from "../Middlewares/userAuth.js";

const blogRouter = Router();

blogRouter.post("/create", authUser, createBlog);

export default blogRouter;
