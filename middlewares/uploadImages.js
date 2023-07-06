import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images/"));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + ".jpeg");
    }
  });
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);

    } else {
        cb({
            message: "undupported file format"
        }, false)
    }
}
export const productImageResize = async (req, res, next) => {
    console.log(req.files, 'rrrrrrr')
    if (!req.files) return next();
    await Promise.all(req.files.map(async (file) => {
        await sharp(file.path).resize(300, 300)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/images/products/${file.filename}`)
    }));
    // fs.unlinkSync(`public/images/products/${file.filename}`);
    next();
}
export const blogImageResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(req.files.map(async (file) => {
        await sharp(file.path).resize(300, 300)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/images/blogs/${file.filename}`)
    }));
    // fs.unlinkSync(`public/images/products/${file.filename}`);
    next();
}
export const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fieldSize: 2000000}
});

