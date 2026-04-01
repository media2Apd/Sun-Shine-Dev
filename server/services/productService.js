import * as repo from "../repositories/productRepo.js";

import {
uploadToCloudinary,
deleteFromCloudinary,
uploadVideoToCloudinary
} from "../utils/Cloudinary.js";


/* CREATE PRODUCT */

export const createProduct = async (body, files) => {

if (body.variants && typeof body.variants === "string") {
body.variants = JSON.parse(body.variants);
}

if (body.existingImages && typeof body.existingImages === "string") {
body.existingImages = JSON.parse(body.existingImages);
}

const data = { ...body };


/* IMAGE UPLOAD */

if (files?.images?.length) {

const uploadedImages = [];

for (const file of files.images) {

const img = await uploadToCloudinary(
file.buffer,
"products/images"
);

uploadedImages.push(img);

}

data.images = uploadedImages;

}


/* VIDEO UPLOAD */

if (files?.video?.[0]) {

const video = await uploadVideoToCloudinary(
files.video[0].buffer,
"products/videos"
);

data.video = video;

}

return repo.createProduct(data);

};



/* UPDATE PRODUCT */

export const updateProduct = async (id, body, files) => {

const existing = await repo.getProductById(id);

if (!existing)
throw new Error("Product not found");


/* =============================
PARSE JSON FIELDS (multipart fix)
============================= */

if (body.variants && typeof body.variants === "string") {

body.variants = JSON.parse(body.variants);

}

if (body.existingImages && typeof body.existingImages === "string") {

body.existingImages = JSON.parse(body.existingImages);

}


const updateData = { ...body };


/* =============================
IMAGE UPDATE LOGIC
============================= */

let updatedImages = [];


/* KEEP SELECTED EXISTING IMAGES */

if (body.existingImages?.length) {

updatedImages = existing.images.filter(img =>
body.existingImages.includes(img.url)
);


/* DELETE REMOVED IMAGES */

const removedImages = existing.images.filter(img =>
!body.existingImages.includes(img.url)
);

for (const img of removedImages) {

await deleteFromCloudinary(img.publicId);

}

}


/* IF existingImages EMPTY → REMOVE ALL OLD IMAGES */

if (!body.existingImages || body.existingImages.length === 0) {

for (const img of existing.images) {

await deleteFromCloudinary(img.publicId);

}

updatedImages = [];

}


/* UPLOAD NEW IMAGES */

if (files?.images?.length) {

for (const file of files.images) {

const uploaded = await uploadToCloudinary(
file.buffer,
"products/images"
);

updatedImages.push(uploaded);

}

}


updateData.images = updatedImages;


/* =============================
VIDEO UPDATE LOGIC
============================= */

if (files?.video?.[0]) {

/* delete old video */

if (existing.video?.publicId) {

await deleteFromCloudinary(existing.video.publicId);

}

/* upload new video */

const uploadedVideo = await uploadVideoToCloudinary(
files.video[0].buffer,
"products/videos"
);

updateData.video = uploadedVideo;

}


/* =============================
UPDATE PRODUCT
============================= */

return repo.updateProduct(id, updateData);

};



/* DELETE PRODUCT */

export const deleteProduct = async (id) => {

const existing = await repo.getProductById(id);

if (!existing) throw new Error("Product not found");


/* DELETE IMAGES */

if (existing.images?.length) {

for (const img of existing.images) {

await deleteFromCloudinary(img.publicId);

}

}


/* DELETE VIDEO */

if (existing.video?.publicId) {

await deleteFromCloudinary(existing.video.publicId);

}


return repo.deleteProduct(id);

};



export const getAllProducts = () =>
repo.getAllProducts();


export const getProductById = (id) =>
repo.getProductById(id);

export const getProductBySlugOrIdService = async (slugOrId) => {

  const product = await repo.getProductBySlugOrIdRepo(slugOrId);

  if (!product)
    throw new Error("Product not found");

  return product;

};