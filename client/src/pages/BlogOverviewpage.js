// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useBlog } from "../Context/BlogContext";

// export default function BlogOverview() {
//   const { slug } = useParams(); // get slug from URL
//   const { blogs } = useBlog();
//   const navigate = useNavigate();

//   // Find the blog by slug (or fallback to id if you prefer)
//   const blog = blogs.find(
//     (b) => b.slug === slug || b.id.toString() === slug
//   );

//   if (!blog) {
//     return (
//       <div className="p-6 text-center text-gray-500">
//         Blog not found.
//         <button
//           onClick={() => navigate(-1)}
//           className="block mt-4 text-green-600 hover:underline"
//         >
//           ← Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-lg shadow-md min-h-screen">
//       {/* BACK BUTTON */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 border px-4 py-2 rounded hover:bg-gray-100"
//       >
//         ← Back
//       </button>

//       {/* TITLE */}
//       <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>

//       {/* AUTHOR & DATE */}
//       {blog.author && blog.date && (
//         <p className="text-gray-500 mb-6">
//           {blog.author} • {blog.date}
//         </p>
//       )}

//       {/* FEATURED IMAGE */}
//       {blog.featuredImage && (
//         <img
//           src={blog.featuredImage}
//           alt={blog.title}
//           className="w-full rounded-lg mb-8 object-cover max-h-96"
//         />
//       )}

//       {/* CONTENT */}
//       <div className="space-y-6">
//         {blog.content?.map((block, i) => {
//           switch (block.type) {
//             case "heading":
//               return (
//                 <h2
//                   key={i}
//                   className="text-2xl font-semibold"
//                   dangerouslySetInnerHTML={{ __html: block.value }}
//                 />
//               );
//             case "paragraph":
//               return (
//                 <p
//                   key={i}
//                   className="text-gray-700 leading-relaxed"
//                   dangerouslySetInnerHTML={{ __html: block.value }}
//                 />
//               );
//             case "list":
//               return (
//                 <ul
//                   key={i}
//                   className="pl-6 list-disc text-gray-700"
//                   dangerouslySetInnerHTML={{ __html: block.value }}
//                 />
//               );
//             case "quote":
//               return (
//                 <blockquote
//                   key={i}
//                   className="border-l-4 pl-4 italic text-gray-600"
//                   dangerouslySetInnerHTML={{ __html: block.value }}
//                 />
//               );
//             case "faq":
//               return (
//                 <div
//                   key={i}
//                   className="bg-gray-50 p-4 rounded-lg"
//                   dangerouslySetInnerHTML={{ __html: block.value }}
//                 />
//               );
//             case "tip":
//               return (
//                 <div
//                   key={i}
//                   className="bg-green-50 border-l-4 border-green-500 p-4 rounded"
//                   dangerouslySetInnerHTML={{ __html: block.value }}
//                 />
//               );
//             case "image":
//               return (
//                 <img
//                   key={i}
//                   src={block.value}
//                   alt=""
//                   className="w-full rounded-lg"
//                 />
//               );
//             default:
//               return null;
//           }
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../common/apiClient";
import SummaryApi from "../common/SummaryApi";
import { formatDateTime } from "../helpers/formatDateTime";
import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

export default function BlogOverview() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await api({
        url: SummaryApi.getOneBlog.url(slug),
        method: SummaryApi.getOneBlog.method,
      });

      setBlog(response.data);
    } catch (err) {
      console.error("Fetch blog error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (slug) {
    fetchBlog();
  }
}, [slug]);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading blog...
      </div>
    );
  }

  // ❌ Not found
  if (!blog) {
    return (
      <div className="p-6 text-center text-gray-500">
        Blog not found.
        <button
          onClick={() => navigate(-1)}
          className="block mt-4 text-green-600 hover:underline"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-white min-h-screen">

    <div className="mb-4">
      <span className="px-4 py-1.5 rounded-full text-[#00B207] bg-[#00B207]/10">
        {blog.category}
      </span>
    </div>

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {blog.title}
      </h1>

      {/* AUTHOR + DATE */}
      <div className="flex flex-wrap items-center gap-4 text-[#64748B] text-sm mb-6">

        {/* DATE */}
        {blog.publishDate && (
          <div className="flex items-center gap-1">
            <FiCalendar className="text-base" />
            <span>{formatDateTime(blog.publishDate, false)}</span>
          </div>
        )}

        {/* READ TIME (static or dynamic) */}
        <div className="flex items-center gap-1">
          <FiClock className="text-base" />
          <span>5 min read</span>
        </div>

        {/* AUTHOR */}
        {blog.author && (
          <div className="flex items-center gap-1">
            <FiUser className="text-base" />
            <span>By {blog.author}</span>
          </div>
        )}

      </div>

      {/* IMAGE */}
      {blog.featuredImage?.url && (
      <div className="w-full bg-gray-100 rounded-lg mb-8 flex justify-center items-center">
        <img
          src={blog.featuredImage.url}
          alt={blog.title}
          className="max-h-[500px] w-auto object-contain"
        />
      </div>
      )}

      {/* CONTENT */}
      <div className="space-y-6">
        {blog.content?.map((block, i) => {
          switch (block.type) {
            case "heading":
              return (
                <h2
                  key={i}
                  className="text-2xl font-semibold"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );

            case "paragraph":
              return (
                <p
                  key={i}
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );

            case "list":
              return (
                <ul
                  key={i}
                  className="pl-6 list-disc text-gray-700"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );

            case "quote":
              return (
                <blockquote
                  key={i}
                  className="border-l-4 pl-4 italic text-gray-600"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );

            case "faq":
              return (
                <div
                  key={i}
                  className="bg-gray-50 p-4 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );

            case "tip":
              return (
                <div
                  key={i}
                  className="bg-[#00B207] border-l-4 border-green-500 p-4 rounded"
                  dangerouslySetInnerHTML={{ __html: block.value }}
                />
              );

            case "image":
              return (
                <div
                  key={i}
                  className="w-full bg-gray-100 rounded-lg flex justify-center items-center my-4"
                >
                  <img
                    src={block.value}
                    alt=""
                    className="max-h-[500px] w-auto object-contain rounded-lg"
                  />
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}