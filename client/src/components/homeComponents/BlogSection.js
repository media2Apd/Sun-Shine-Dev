import React from "react";
import { useBlog } from "../../Context/BlogContext";
import BlogCard from "./BlogCard"

function BlogSection() {

  const { blogs } = useBlog();

  // ⭐ only first 4 blogs
  const latestBlogs = blogs.slice(0, 4);

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Latest Blogs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {latestBlogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}

      </div>

    </div>

  );
}

export default BlogSection;