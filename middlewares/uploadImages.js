import multer from 'multer';
import sharp from 'sharp';
import path from 'path';


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../public/images"))
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
const productImageResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(req.files.map((file) => {
        
    }))
}
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {fieldSize: 2000000}
})