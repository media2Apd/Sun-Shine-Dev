import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import SummaryApi from "../../common/SummaryApi";
import api from "../../common/apiClient";
import { useNavigate } from "react-router-dom";

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const fetchBlogs = async () => {
    try {
      const response = await api({
        url: SummaryApi.getAllBlogs.url + "?status=Published",
        method: SummaryApi.getAllBlogs.method,
      });

      // 🔥 IMPORTANT (based on your API)
      setBlogs(response.data);
    } catch (err) {
      console.error("Blog fetch error:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const latestBlogs = blogs?.slice(0, 4) || [];

  const getSummary = (blog) => {
    const paragraph = blog.content?.find(
      (item) => item.type === "paragraph"
    );

    return (
      paragraph?.value ||
      blog.metaDescription ||
      "No summary available."
    );
  };

  return (
    <div className="container mx-auto bg-white py-4 px-4 md:px-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold">
          Latest Blogs
        </h2>

        <button onClick={ ()=> navigate('/blogs')} className="text-[#354A10] font-medium">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestBlogs.map((blog) => {
          const cardData = {
            title: blog.title,
            category: blog.category,
            summary: getSummary(blog), // ✅ updated
            image: blog.featuredImage?.url || null,
            slug: blog.slug,
          };

          return (
            <BlogCard key={blog._id} blog={cardData} />
          );
        })}
      </div>
    </div>
  );
}

export default BlogSection;