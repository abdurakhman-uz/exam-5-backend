import { Router } from "express";
import { login, register, savat, wishlist } from "../controllers/users.js";


const router = Router();

router.post("/login", login)
router.post("/register", register)
router.post("/add-wishlist", wishlist)
router.post("/add-savat", savat)

export default router;