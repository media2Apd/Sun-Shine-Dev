// import React, { useEffect, useState } from "react";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import BlogCard from "../components/homeComponents/BlogCard";

// function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchBlogs = async () => {
//     try {
//       const response = await api({
//         url: SummaryApi.getAllBlogs.url,
//         method: SummaryApi.getAllBlogs.method,
//       });

//       setBlogs(response.data);
//     } catch (err) {
//       console.error("Fetch blogs error:", err);
//       setError("Failed to load blogs");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // 🔥 summary logic
//   const getSummary = (blog) => {
//     const paragraph = blog.content?.find(
//       (item) => item.type === "paragraph"
//     );

//     return (
//       paragraph?.value ||
//       blog.metaDescription ||
//       "No summary available."
//     );
//   };

//   // 🔄 LOADING UI
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto p-4">
//         <p className="text-center text-gray-400">Loading blogs...</p>
//       </div>
//     );
//   }

//   // ❌ ERROR UI
//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 text-center">
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={fetchBlogs}
//           className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // 📭 EMPTY UI
//   if (blogs.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto p-4 text-center text-gray-400">
//         No blogs found
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4">

//       {/* TITLE */}
//       <h1 className="text-2xl lg:text-3xl font-semibold mb-6">
//         All Blogs
//       </h1>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         {blogs.map((blog) => {
//           const cardData = {
//             title: blog.title,
//             category: blog.category,
//             summary: getSummary(blog),
//             image: blog.featuredImage?.url || null,
//             slug: blog.slug,
//           };

//           return (
//             <BlogCard key={blog._id} blog={cardData} />
//           );
//         })}

//       </div>

//     </div>
//   );
// }

// export default BlogPage;

import React, { useEffect, useState } from "react";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import BlogCard from "../components/homeComponents/BlogCard";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  const fetchBlogs = async () => {
    try {
    const response = await api({
      url: SummaryApi.getAllBlogs.url + "?status=Published",
      method: SummaryApi.getAllBlogs.method,
    });

      setBlogs(response.data);
    } catch (err) {
      setError("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🔥 summary logic
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

  // 🔥 latest blog for banner
  const latestBlog = blogs[0];

  // 🔥 filter
  const filteredBlogs =
    category === "All"
      ? blogs
      : blogs.filter((b) => b.category === category);

  // 🔥 sort
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sort === "latest") {
      return new Date(b.publishDate) - new Date(a.publishDate);
    }
    return new Date(a.publishDate) - new Date(b.publishDate);
  });

  // 🔥 unique categories
  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-4 px-8">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold">Blogs</h1>
        <p className="text-gray-500 mt-2">
          Expert insights, crop care tips, and fertilizer guidance
        </p>
      </div>

      {/* 🔥 BANNER (LATEST BLOG) */}
      {latestBlog && (
        <div className="relative mb-10 rounded-xl overflow-hidden">
          <img
            src={latestBlog.featuredImage?.url}
            className="w-full h-[350px] object-cover"
            alt=""
          />

          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="p-6 text-white max-w-xl">
              <p className="text-sm mb-2">{latestBlog.category}</p>
              <h2 className="text-2xl font-semibold mb-2">
                {latestBlog.title}
              </h2>
              <p className="text-sm line-clamp-2">
                {getSummary(latestBlog)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 FILTER + SORT */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        {/* CATEGORY */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>

        {/* SORT */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

      </div>

      {/* 🔥 BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {sortedBlogs.map((blog) => {
          const cardData = {
            title: blog.title,
            category: blog.category,
            summary: getSummary(blog),
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

export default BlogPage;