import express from "express";

import * as controller
from "../controllers/productController.js";

import {
uploadProductImages
}
from "../utils/Cloudinary.js";

import * as validator
from "../validators/productValid.js";

const router=express.Router();


router.post(
"/create",
uploadProductImages,
validator.validate(
validator.createProductSchema
),
controller.createProduct
);


router.get("/view-all",
controller.getAllProducts
);


router.get(
"/view-one/:id",
validator.validate(
validator.mongoIdSchema,
"params"
),
controller.getProductById
);


router.put(
"/update-one/:id",
uploadProductImages,
validator.validate(
validator.updateProductSchema
),
controller.updateProduct
);


router.delete(
"/delete-one/:id",
validator.validate(
validator.mongoIdSchema,
"params"
),
controller.deleteProduct
);


export default router;