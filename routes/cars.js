import { Router } from "express";
import { create, createCoverImage, createImage, createImages, deleted, get, getCarImages, getInfoCar, update } from "../controllers/cars.js";
import authenticateToken from "../middlewares/jwt.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", get)
router.get("/images/:imageName", getCarImages)
router.get("/info/:id", getInfoCar)
router.post("/create", authenticateToken, create);
router.post("/create/infoImage", authenticateToken, upload.single('file'), createImage);
router.post("/create/coverImage", authenticateToken, upload.single('file'), createCoverImage);
router.post("/create/images", authenticateToken, upload.single('file'), createImages);
// router.post("/create/images", authenticateToken, (req, res) => {
//     console.log(req.url);
// });
router.post("/update/:id", authenticateToken, update);
router.post("/delete/:id", authenticateToken, deleted);
// router.post("/create/image", authenticateToken, upload.single('file'), createImage);


export default router;