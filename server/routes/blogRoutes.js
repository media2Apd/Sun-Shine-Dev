import express from "express";

import * as controller
from "../controllers/blogController.js";

import {
uploadBlogMedia
}
from "../utils/Cloudinary.js";

const router=express.Router();


router.post(
"/create",
uploadBlogMedia,
controller.createBlog
);


router.get(
"/view-all",
controller.getBlogs
);


router.get(
"/view-one/:slug",
controller.getBlogBySlug
);


router.put(
"/update-one/:id",
uploadBlogMedia,
controller.updateBlog
);


router.delete(
"/delete/:id",
controller.deleteBlog
);


export default router;