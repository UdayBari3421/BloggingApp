import { Router } from "express";
import { addComment, addCommentReply, createBlog, getAllBlogs, getComments } from "../Controllers/blogContoller.js";
import authUser from "../Middlewares/userAuth.js";

const blogRouter = Router();

blogRouter.post("/create", authUser, createBlog);
blogRouter.get("/getall", authUser, getAllBlogs);
blogRouter.post("/addcomment/:blogId", authUser, addComment);
blogRouter.post("/addcomment/:blogId/:commentId/reply", authUser, addCommentReply);
blogRouter.get("/comments/:blogId", authUser, getComments);

export default blogRouter;
