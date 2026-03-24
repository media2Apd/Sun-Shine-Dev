import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Storage for category icon
const iconStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "categories/icons",
    allowed_formats: ["jpg", "jpeg", "png", "svg", "webp"],
    transformation: [{ width: 200, height: 200, crop: "limit" }],
  },
});

// Storage for category image
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "categories/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

export const uploadIcon = multer({ storage: iconStorage });
export const uploadImage = multer({ storage: imageStorage });

// Upload both icon and image fields in one middleware (memoryStorage → manual upload)
export const uploadCategoryFiles = multer({
  storage: multer.memoryStorage(),
}).fields([
  { name: "icon", maxCount: 1 },
  { name: "image", maxCount: 1 },
]);

export const uploadProductImages = multer({
storage: multer.memoryStorage()
}).array("images", 5);

export const uploadProductMedia = multer({
  storage: multer.memoryStorage()
}).fields([
  { name: "images", maxCount: 5 },
  { name: "video", maxCount: 1 }
]);

export const uploadBlogMedia = multer({
  storage: multer.memoryStorage()
}).fields([
  { name: "featuredImage", maxCount: 100 },
  { name: "video", maxCount: 1 }
]);
export const uploadToCloudinary = (buffer, folder = "categories") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        transformation: [{ width: 800, crop: "limit" }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
};
export const uploadVideoToCloudinary = (buffer, folder) =>
new Promise((resolve, reject) => {

const stream = cloudinary.uploader.upload_stream(
{
folder,
resource_type: "video"
},
(error, result) => {

if(error) return reject(error);

resolve({
url: result.secure_url,
publicId: result.public_id
});

}
);

stream.end(buffer);

});
/**
 * Delete an image from Cloudinary by publicId
 * @param {string} publicId
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err.message);
  }
};