import * as repo from "../repositories/productRepo.js";
import {
uploadToCloudinary,
deleteFromCloudinary
} from "../utils/Cloudinary.js";


export const createProduct = async (body, files) => {

  if (body.variants && typeof body.variants === "string") {
    body.variants = JSON.parse(body.variants);
  }

  const data = { ...body };

  if (files?.length) {

    const uploadedImages = [];

    for (const file of files) {

      const img = await uploadToCloudinary(
        file.buffer,
        "products"
      );

      uploadedImages.push(img);
    }

    data.images = uploadedImages;
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

return repo.updateProduct(id,updateData);

};



export const deleteProduct = async(id)=>{

const existing=await repo.getProductById(id);

if(!existing) throw new Error("Product not found");


for(const img of existing.images){

await deleteFromCloudinary(img.publicId);

}

return repo.deleteProduct(id);

};


export const getAllProducts=()=>repo.getAllProducts();

export const getProductById=(id)=>repo.getProductById(id);