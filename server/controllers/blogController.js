import * as service from "../services/blogService.js";


export const createBlog = async (req, res) => {
  try {
    const body = {
      ...req.body,
      content: JSON.parse(req.body.content), // 🔥 ADD THIS
    };

    const blog = await service.createBlog(body, req.files);

    res.json({
      success: true,
      blog,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};



export const getBlogs=async(req,res)=>{

const blogs=await service.getBlogs(

req.query

);

res.json(blogs);

};



export const getBlogBySlug=async(req,res)=>{

const blog=await service.getBlogBySlug(

req.params.slug

);

res.json(blog);

};



export const updateBlog = async (req, res) => {
  const body = {
    ...req.body,
    content: JSON.parse(req.body.content), // 🔥 ADD THIS
  };

  const blog = await service.updateBlog(
    req.params.id,
    body,
    req.files
  );

  res.json(blog);
};



export const deleteBlog=async(req,res)=>{

await service.deleteBlog(

req.params.id

);

res.json({

success:true

});

};

