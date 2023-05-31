import { Router } from "express";
import { create, createImage, createImages, get, getCarImages, getInfoCar } from "../controllers/cars.js";
import authenticateToken from "../middlewares/jwt.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", get)
router.get("/images/:imageName", getCarImages)
router.get("/info/:id", getInfoCar)
router.post("/create", authenticateToken, upload.single('file'), create);
router.post("/create/images", authenticateToken, upload.array('file'), createImages);
router.post("/create/infoImage", authenticateToken, upload.single('file'), createImage);
// router.post("/create/image", authenticateToken, upload.single('file'), createImage);


export default router;