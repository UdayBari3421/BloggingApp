import { Router } from "express";
import authUser from "../middlewares/userAuth.js";
import {
  addComment,
  deleteComment,
  getAllComments,
  getCommentCount,
} from "../controllers/CommentController.js";

const router = Router();

router.post("/add", authUser, addComment);
router.get("/getall", getAllComments);
router.get("/count", getCommentCount);
router.delete("/delete", authUser, deleteComment);

export default router;
