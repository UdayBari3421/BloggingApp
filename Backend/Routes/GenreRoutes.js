import { Router } from "express";
import { addGenre, getGenres } from "../Controllers/GenreController.js";
import authUser from "../Middlewares/userAuth.js";
import adminAuth from "../Middlewares/adminAuth.js";

const router = Router();

router.get("/getall", getGenres);
router.post("/add", authUser, addGenre);

export default router;
