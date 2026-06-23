import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import SummaryApi from "../../common/SummaryApi";
import api from "../../common/apiClient";
import { useNavigate } from "react-router-dom";

// --- Skeleton Loader for BlogSection ---
const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-100">
    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 animate-pulse w-1/4 rounded"></div>
      <div className="h-6 bg-gray-200 animate-pulse w-full rounded"></div>
      <div className="h-4 bg-gray-200 animate-pulse w-2/3 rounded"></div>
    </div>
  </div>
);

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 Loading state
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    setLoading(true); // Fetch start panna pothu loading true
    try {
      const response = await api({
        url: SummaryApi.getAllBlogs.url + "?status=Published",
        method: SummaryApi.getAllBlogs.method,
      });
      setBlogs(response.data);
    } catch (err) {
      console.error("Blog fetch error:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Summary helper
  const getSummary = (blog) => {
    const paragraph = blog.content?.find((item) => item.type === "paragraph");
    return paragraph?.value || blog.metaDescription || "No summary available.";
  };

  const latestBlogs = blogs?.slice(0, 4) || [];

  //  Logic: Loading 
  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto bg-white py-4 px-4 md:px-8">
      {/* HEADER - Loading */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold text-gray-800">
          Latest Blogs
        </h2>

        <button 
          onClick={() => navigate('/blogs')} 
          className="text-[#354A10] font-semibold hover:underline"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (

          [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
        ) : (
          latestBlogs.map((blog) => {
            const cardData = {
              title: blog.title,
              category: blog.category,
              summary: getSummary(blog),
              image: blog.featuredImage?.url || null,
              slug: blog.slug,
            };

            return <BlogCard key={blog._id} blog={cardData} />;
          })
        )}
      </div>
    </div>
  );
}

export default BlogSection;