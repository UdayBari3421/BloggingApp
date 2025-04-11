import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blogContoller.js";
import authUser from "../middlewares/userAuth.js";

const blogRouter = Router();

blogRouter.post("/create", authUser, createBlog);
blogRouter.get("/getall", getAllBlogs);

export default blogRouter;
