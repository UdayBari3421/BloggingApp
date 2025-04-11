import { Router } from "express";
import { addGenre, getGenres } from "../controllers/genreController.js";
import authUser from "../middlewares/userAuth.js";

const router = Router();

router.get("/getall", getGenres);
router.post("/add", authUser, addGenre);

export default router;
