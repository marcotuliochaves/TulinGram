const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Tipos permitidos (mantendo sua lógica)
const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/pjpeg"];

const fileFilter = (req, file, cb) => {
  console.log("🧪 Tipo MIME recebido:", file.mimetype);

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de arquivo não suportado"), false);
  }
};

// Storage no Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    return {
      folder: `tulingram/${folder}`,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    };
  },
});

const imageUpload = multer({
  storage,
  fileFilter,
});

module.exports = { imageUpload };