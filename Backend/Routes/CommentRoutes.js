import { Router } from "express";
import { addComment, deleteComment, getComments } from "../Controllers/CommentController.js";
import authUser from "../Middlewares/userAuth.js";

const router = Router();

router.post("/create", authUser, addComment);
router.get("/getall", authUser, getComments);
router.delete("/delete", authUser, deleteComment);

export default router;
