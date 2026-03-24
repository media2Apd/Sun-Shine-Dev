import Blog from "../models/Blog.js";

export const createBlog=data=>Blog.create(data);

export const getBlogs=(query)=>{

return Blog.find(query)
.sort({createdAt:-1});

};

export const getBlogBySlug=slug=>

Blog.findOne({slug});

export const updateBlog=(id,data)=>

Blog.findByIdAndUpdate(id,data,{new:true});

export const deleteBlog=id=>

Blog.findByIdAndDelete(id);