import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rtex-products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"]
  }
});

export const productUpload = multer({ storage });
