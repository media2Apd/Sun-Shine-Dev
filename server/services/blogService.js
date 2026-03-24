import * as repo from "../repositories/blogRepo.js";
import {
uploadToCloudinary,
deleteFromCloudinary
} from "../utils/cloudinary.js";


export const createBlog = async(body,files)=>{

const exists = await repo.getBlogBySlug(body.slug);

if(exists)
throw new Error("Slug already exists");


const data={...body};


/* featured image */

if(files?.featuredImage?.[0]){

const uploaded = await uploadToCloudinary(

files.featuredImage[0].buffer,

"blogs/featured"

);

data.featuredImage=uploaded;

}

return repo.createBlog(data);

};


export const updateBlog=async(id,body,files)=>{

const data={...body};


/* replace featured image */

if(files?.featuredImage?.[0]){

const uploaded=await uploadToCloudinary(

files.featuredImage[0].buffer,

"blogs/featured"

);

data.featuredImage=uploaded;

}

return repo.updateBlog(id,data);

};


export const deleteBlog=async(id)=>{

const blog=await repo.deleteBlog(id);

if(blog?.featuredImage?.publicId){

await deleteFromCloudinary(

blog.featuredImage.publicId

);

}

return blog;

};


export const getBlogs=query=>

repo.getBlogs(query);


export const getBlogBySlug=slug=>

repo.getBlogBySlug(slug);