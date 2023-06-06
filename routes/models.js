import { Router } from "express";
import multer from 'multer';
import path from 'path';
import { create, createImage, get, getCars, getImages, update } from "../controllers/models.js";
import authenticateToken from "../middlewares/jwt.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/category/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = `${Math.floor(Math.random() * 1024 * 2048) * 4096}${extension}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

const router = Router();

router.get("/models", get)
router.get('/images/:imageName', getImages )
router.get('/cars/:category', getCars )
router.post("/models/create", authenticateToken, upload.single('file'), create)
router.post("/models/image/create", authenticateToken, upload.single('file'), createImage)
router.post("/models/update/:id", authenticateToken, update)

export default router;