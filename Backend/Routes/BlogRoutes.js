import { Router } from "express";
import { addComment, createBlog, getAllBlogs } from "../Controllers/blogContoller.js";
import authUser from "../Middlewares/userAuth.js";

const blogRouter = Router();

blogRouter.post("/create", authUser, createBlog);
blogRouter.get("/getall", authUser, getAllBlogs);
blogRouter.post("/addcomment/:blogId", authUser, addComment);

export default blogRouter;
