import React from "react";
import { useBlog } from "../Context/BlogContext"
import BlogCard from "../components/homeComponents/BlogCard"

const BlogList = () => {

  const { blogs } = useBlog();

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">

      {blogs.length === 0 ? (

        <p>No Blogs Found</p>

      ) : (

        blogs.map((blog, index) => (

          <BlogCard
            key={index}
            title={blog.title}
            image={blog.image}
            summary={blog.summary}
            author={blog.author}
            date={blog.publishDate}
          />

        ))

      )}

    </div>
  );
};

export default BlogList;