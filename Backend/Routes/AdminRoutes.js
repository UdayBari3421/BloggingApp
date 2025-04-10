import { Router } from "express";
import adminAuth from "../Middlewares/adminAuth.js";
import { addAdmin } from "../Controllers/AdminController.js";

const router = Router();

router.post("/add", adminAuth, addAdmin);

export default router;
