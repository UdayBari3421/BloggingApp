import { Router } from "express";
import { addComment, getComments } from "../Controllers/CommentController.js";
import authUser from "../Middlewares/userAuth.js";

const router = Router();

router.post("/create", authUser, addComment);
router.get("/getall", authUser, getComments);

export default router;
