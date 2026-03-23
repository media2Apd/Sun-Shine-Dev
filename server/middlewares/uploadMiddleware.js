// import multer from "multer";

// const storage = multer.memoryStorage();
// export const upload = multer({ storage });
// middlewares/upload.js
import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage()
});

