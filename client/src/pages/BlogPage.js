import React from "react";

import { useBlog } from "../Context/BlogContext";
import BlogCard from "../components/homeComponents/BlogCard"

function BlogPage() {

  const { blogs } = useBlog();

  return (
    <div className="max-w-7xl mx-auto p-4">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}

      </div>

    </div>
  );
}

export default BlogPage;




