import express from "express";
import * as categoryController from "../controllers/catgoryController.js";
import { uploadCategoryFiles } from "../utils/Cloudinary.js";
import * as categaryValidator from "../validators/categoryValid.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/view-all", categoryController.getAllCategories);

router.get(
  "/view-one/:id",
  categaryValidator.validate(categaryValidator.mongoIdSchema, "params"),
  categoryController.getCategoryById
);

router.use(authMiddleware);

router.post(
  "/create",
  uploadCategoryFiles,
  categaryValidator.validate(categaryValidator.createCategorySchema),
  categoryController.createCategory
);


router.put(
  "/update-one/:id",
  uploadCategoryFiles,
  categaryValidator.validate(categaryValidator.updateCategorySchema),
  categoryController.updateCategory
);

router.delete(
  "/delete-one/:id",
  categaryValidator.validate(categaryValidator.mongoIdSchema, "params"),
  categoryController.deleteCategory
);

export default router;