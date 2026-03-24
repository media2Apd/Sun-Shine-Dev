import * as repo from "../repositories/productRepo.js";
import {
uploadToCloudinary,
deleteFromCloudinary,
uploadVideoToCloudinary
} from "../utils/Cloudinary.js";


export const createProduct = async (body, files) => {

if (body.variants && typeof body.variants === "string") {
body.variants = JSON.parse(body.variants);
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



export const updateProduct = async(id,body,files)=>{

const existing=await repo.getProductById(id);

if(!existing) throw new Error("Product not found");

const updateData={...body};


if(files?.length){

for(const img of existing.images){

await deleteFromCloudinary(img.publicId);

}

const uploadedImages=[];

for(const file of files){

const img=await uploadToCloudinary(
file.buffer,
"products"
);

uploadedImages.push(img);

}

updateData.images=uploadedImages;

}
if (files?.video?.[0]) {

await deleteFromCloudinary(existing.video?.publicId);

const video = await uploadVideoToCloudinary(
files.video[0].buffer,
"products/videos"
);

updateData.video = video;

}
return repo.updateProduct(id,updateData);

};



export const deleteProduct = async(id)=>{

const existing=await repo.getProductById(id);

if(!existing) throw new Error("Product not found");


for(const img of existing.images && existing.video){

await deleteFromCloudinary(img.publicId);

}

return repo.deleteProduct(id);

};


export const getAllProducts=()=>repo.getAllProducts();

export const getProductById=(id)=>repo.getProductById(id);