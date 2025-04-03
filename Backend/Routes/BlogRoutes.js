import { Router } from "express";
import { createBlog, getAllBlogs } from "../Controllers/blogContoller.js";
import authUser from "../Middlewares/userAuth.js";

const blogRouter = Router();

blogRouter.post("/create", authUser, createBlog);
blogRouter.get("/getall", getAllBlogs);

export default blogRouter;
