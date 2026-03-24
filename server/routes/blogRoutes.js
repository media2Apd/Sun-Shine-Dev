import express from "express";

import * as controller
from "../controllers/blogController.js";

import {
uploadBlogMedia
}
from "../utils/cloudinary.js";

const router=express.Router();


router.post(
"/create",
uploadBlogMedia,
controller.createBlog
);


router.get(
"/all",
controller.getBlogs
);


router.get(
"/:slug",
controller.getBlogBySlug
);


router.put(
"/update/:id",
uploadBlogMedia,
controller.updateBlog
);


router.delete(
"/delete/:id",
controller.deleteBlog
);


export default router;