const multer = require("multer");
const path = require("path");

const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/pjpeg"];

const fileFilter = (req, file, cb) => {
  console.log("🧪 Tipo MIME recebido:", file.mimetype);
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não suportado"), false);
  }
};
// Destination to store image
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter,
});

module.exports = { imageUpload };
