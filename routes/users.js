import { Router } from "express";
import { admin, deleteUser, editUser, getUsers, login, register, savat, update, userInfo, wishlist } from "../controllers/users.js";
import authenticateToken from "../middlewares/jwt.js"
import userAuthenticateToken from "../middlewares/user_jwt.js"



const router = Router();

router.post("/login", login)
router.post("/register", register)
router.post("/update", userAuthenticateToken, update)
router.get("/info", userAuthenticateToken, userInfo)
router.post("/admin", authenticateToken, admin)
router.post("/add-wishlist", wishlist)
router.post("/add-savat", savat)
router.get("/admin/users", authenticateToken, getUsers)
router.post("/admin/user/update/:id", authenticateToken, editUser)
router.post("/admin/user/delete/:id", authenticateToken, deleteUser)

export default router;