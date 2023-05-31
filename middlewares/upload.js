import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/cars/');
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = `${Math.floor(Math.random() * 1024 * 2048) * 4096}${extension}`;
        cb(null, filename);
    },
});
const upload = multer({ storage });

export default upload;