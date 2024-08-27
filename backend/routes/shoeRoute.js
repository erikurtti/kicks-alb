import express from 'express';
import multer from 'multer';
import { addShoe, listShoe, removeShoe } from '../controllers/shoeController.js';

const shoeRouter = express.Router();

//Image Storage Engine (Saving Image to uploads folder & rename it)

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})

shoeRouter.get("/list",listShoe);
shoeRouter.post("/add",upload.single('image'),addShoe);
shoeRouter.post("/remove",removeShoe);

export default shoeRouter;