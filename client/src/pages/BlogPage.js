// import React, { useEffect, useState } from "react";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import BlogCard from "../components/homeComponents/BlogCard";
// import SelectDropdown from "../customStyles/SelectDropdown";
// function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("latest");

//   const fetchBlogs = async () => {
//     try {
//     const response = await api({
//       url: SummaryApi.getAllBlogs.url + "?status=Published",
//       method: SummaryApi.getAllBlogs.method,
//     });

//       setBlogs(response.data);
//     } catch (err) {
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

//   // 🔥 latest blog for banner
//   const latestBlog = [...blogs].sort(
//     (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
//   )[0];

//   // 🔥 filter
//   const filteredBlogs =
//     !category
//       ? blogs   // ✅ nothing selected → show all
//       : blogs.filter((b) => b.category === category);

//   // 🔥 sort
//   const sortedBlogs = [...filteredBlogs].sort((a, b) => {
//     if (sort === "latest") {
//       return new Date(b.publishDate) - new Date(a.publishDate);
//     }
//     return new Date(a.publishDate) - new Date(b.publishDate);
//   });

//   // 🔥 unique categories
// const categories = [
//   ...new Set(
//     blogs
//       .map((b) => b.category)
//       .filter((cat) => cat && cat !== "All") // ❌ remove duplicate All
//   ),
// ];
//     const sortOptions = [
//       { id: "latest", label: "Latest" },
//       { id: "oldest", label: "Oldest" },
//     ];
//     const categoryOptions = categories.map((cat) => ({
//       id: cat,
//       label: cat,
//     }));

//   if (loading) return <div className="p-6 text-center">Loading...</div>;
//   if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto py-4 px-8">

//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl font-semibold">Blogs</h1>
//         <p className="text-gray-500 mt-2">
//           Expert insights, crop care tips, and fertilizer guidance
//         </p>
//       </div>

//       {/* 🔥 BANNER (LATEST BLOG) */}
//       {latestBlog && (
//         <div className="relative mb-10 rounded-xl overflow-hidden">
//           <img
//             src={latestBlog.featuredImage?.url}
//             className="w-full h-[350px] object-cover"
//             alt=""
//           />

//           <div className="absolute inset-0 bg-black/40 flex items-end">
//             <div className="p-6 text-white max-w-xl">
//               <p className="text-sm mb-2">{latestBlog.category}</p>
//               <h2 className="text-2xl font-semibold mb-2">
//                 {latestBlog.title}
//               </h2>
//               <p className="text-sm line-clamp-2">
//                 {getSummary(latestBlog)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔥 FILTER + SORT */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

//         {/* CATEGORY */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500">Category:</span>

//         <SelectDropdown
//           options={categoryOptions}
//           value={category}
//           onChange={setCategory}
//           placeholder="Select Category" // ✅ only display, not inside list
//           searchable={true}
//           parentClassName="w-48 border border-[#E6E6E6] rounded-lg"
//           ChildClassName="py-2"
//         />
//         </div>

//         {/* SORT */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>

//           <SelectDropdown
//             options={sortOptions}
//             value={sort}
//             onChange={setSort}
//             placeholder="" // ✅ ADD THIS
//             parentClassName="w-40 border border-[#E6E6E6] rounded-lg"
//             ChildClassName="py-2"
//          />
//         </div>

//       </div>

//       {/* 🔥 BLOG GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         {sortedBlogs.map((blog) => {
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



// import React, { useEffect, useState } from "react";
// import api from "../common/apiClient";
// import SummaryApi from "../common/SummaryApi";
// import BlogCard from "../components/homeComponents/BlogCard";
// import SelectDropdown from "../customStyles/SelectDropdown";
// function BlogPage() {
//   const [blogs, setBlogs] = useState([]);
//   const [error, setError] = useState("");

//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("latest");

//   const fetchBlogs = async () => {
//     try {
//     const response = await api({
//       url: SummaryApi.getAllBlogs.url + "?status=Published",
//       method: SummaryApi.getAllBlogs.method,
//     });

//       setBlogs(response.data);
//     } catch (err) {
//       setError("Failed to load blogs");
//     } finally {
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

//   // 🔥 latest blog for banner
//   const latestBlog = [...blogs].sort(
//     (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
//   )[0];

//   // 🔥 filter
//   const filteredBlogs =
//     !category
//       ? blogs   // ✅ nothing selected → show all
//       : blogs.filter((b) => b.category === category);

//   // 🔥 sort
//   const sortedBlogs = [...filteredBlogs].sort((a, b) => {
//     if (sort === "latest") {
//       return new Date(b.publishDate) - new Date(a.publishDate);
//     }
//     return new Date(a.publishDate) - new Date(b.publishDate);
//   });

//   // 🔥 unique categories
// const categories = [
//   ...new Set(
//     blogs
//       .map((b) => b.category)
//       .filter((cat) => cat && cat !== "All") // ❌ remove duplicate All
//   ),
// ];
//     const sortOptions = [
//       { id: "latest", label: "Latest" },
//       { id: "oldest", label: "Oldest" },
//     ];
//     const categoryOptions = categories.map((cat) => ({
//       id: cat,
//       label: cat,
//     }));

  
//   if (error) return <div className="p-6 text-center text-red-500">{error}</div>;

//   return (
//     <div className="container mx-auto py-4 px-8">

//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl font-semibold">Blogs</h1>
//         <p className="text-gray-500 mt-2">
//           Expert insights, crop care tips, and fertilizer guidance
//         </p>
//       </div>

//       {/* 🔥 BANNER (LATEST BLOG) */}
//       {latestBlog && (
//         <div className="relative mb-10 rounded-xl overflow-hidden">
//           <img
//             src={latestBlog.featuredImage?.url}
//             className="w-full h-[350px] object-cover"
//             alt=""
//           />

//           <div className="absolute inset-0 bg-black/40 flex items-end">
//             <div className="p-6 text-white max-w-xl">
//               <p className="text-sm mb-2">{latestBlog.category}</p>
//               <h2 className="text-2xl font-semibold mb-2">
//                 {latestBlog.title}
//               </h2>
//               <p className="text-sm line-clamp-2">
//                 {getSummary(latestBlog)}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 🔥 FILTER + SORT */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

//         {/* CATEGORY */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500 ">Category:</span>

//         <SelectDropdown
//           options={categoryOptions}
//           value={category}
//           onChange={setCategory}
//           placeholder="Select Category" // ✅ only display, not inside list
//           searchable={true}
//           parentClassName="w-48 border border-[#E6E6E6] rounded-lg"
//           ChildClassName="py-2"
//         />
//         </div>

//         {/* SORT */}
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500 whitespace-nowrap">Sort by:</span>

//           <SelectDropdown
//             options={sortOptions}
//             value={sort}
//             onChange={setSort}
//             placeholder="" // ✅ ADD THIS
//             parentClassName="w-40 border border-[#E6E6E6] rounded-lg"
//             ChildClassName="py-2"
//          />
//         </div>

//       </div>

//       {/* 🔥 BLOG GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

//         {sortedBlogs.map((blog) => {
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
import SelectDropdown from "../customStyles/SelectDropdown";

// --- Skeleton Components ---
const SkeletonBanner = () => (
  <div className="w-full h-64 md:h-[350px] bg-gray-200 animate-pulse rounded-xl mb-10"></div>
);

const SkeletonCard = () => (
  <div className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 animate-pulse w-1/3 rounded"></div>
      <div className="h-6 bg-gray-200 animate-pulse w-full rounded"></div>
      <div className="h-4 bg-gray-200 animate-pulse w-2/3 rounded"></div>
    </div>
  </div>
);

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("latest");

  const fetchBlogs = async () => {
    setLoading(true);
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

  const getSummary = (blog) => {
    const paragraph = blog.content?.find((item) => item.type === "paragraph");
    return paragraph?.value || blog.metaDescription || "No summary available.";
  };

  const latestBlog = [...blogs].sort(
    (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
  )[0];

  const filteredBlogs = !category
    ? blogs
    : blogs.filter((b) => b.category === category);

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sort === "latest") {
      return new Date(b.publishDate) - new Date(a.publishDate);
    }
    return new Date(a.publishDate) - new Date(b.publishDate);
  });

  const categories = [...new Set(blogs.map((b) => b.category).filter(Boolean))];

  const sortOptions = [
    { id: "latest", label: "Latest" },
    { id: "oldest", label: "Oldest" },
  ];
  const categoryOptions = categories.map((cat) => ({ id: cat, label: cat }));

  if (error) return <div className="p-6 text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="container mx-auto py-6 px-4 md:px-8">
      {/* HEADER */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Our Blogs</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base max-w-lg mx-auto">
          Expert insights, crop care tips, and fertilizer guidance to help you grow better.
        </p>
      </div>

      {/* BANNER (LATEST BLOG) */}
      {loading ? (
        <SkeletonBanner />
      ) : (
        !category && latestBlog && (
          <div className="relative mb-10 rounded-2xl overflow-hidden group shadow-lg">
            <img
              src={latestBlog.featuredImage?.url}
              className="w-full h-64 md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              alt={latestBlog.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
              <div className="p-5 md:p-10 text-white max-w-2xl">
                <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-medium mb-3 inline-block uppercase">
                  {latestBlog.category}
                </span>
                <h2 className="text-xl md:text-3xl font-bold mb-2 line-clamp-2">
                  {latestBlog.title}
                </h2>
                <p className="text-sm opacity-90 line-clamp-2 hidden md:block">
                  {getSummary(latestBlog)}
                </p>
              </div>
            </div>
          </div>
        )
      )}

      {/* FILTER & SORT SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Filter by:</span>
          <div className="w-full sm:w-64">
            <SelectDropdown
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              placeholder="All Categories"
              searchable={true}
              parentClassName="w-full bg-white border border-gray-200 rounded-lg shadow-sm"
              ChildClassName="py-2.5 px-4"
            />
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by:</span>
          <div className="w-full sm:w-44">
            <SelectDropdown
              options={sortOptions}
              value={sort}
              onChange={setSort}
              placeholder="Sort Order"
              parentClassName="w-full bg-white border border-gray-200 rounded-lg shadow-sm"
              ChildClassName="py-2.5 px-4"
            />
          </div>
        </div>
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : sortedBlogs.length > 0 ? (
          sortedBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={{
                title: blog.title,
                category: blog.category,
                summary: getSummary(blog),
                image: blog.featuredImage?.url || null,
                slug: blog.slug,
              }}
            />
          ))
        ) : (
          /* MODERN EMPTY STATE */
          <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 4v4h4m-4 4h-4m4 4h-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">No Blogs Found</h3>
            <p className="text-gray-500 max-w-xs mt-2">
              We couldn't find any blogs in this category. Try selecting a different filter or check back later!
            </p>
            {category && (
              <button
                onClick={() => setCategory("")}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium shadow-md"
              >
                Show All Blogs
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;