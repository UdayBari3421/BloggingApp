import { Router } from "express";
import {
  addAdmin,
  adminLogin,
  deleteAdmin,
  getAllAdmins,
  adminLogout,
} from "../controllers/adminController.js";

const router = Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.post("/add", addAdmin);
router.get("/getall", getAllAdmins);
router.delete("/remove/:adminId", deleteAdmin);

export default router;
