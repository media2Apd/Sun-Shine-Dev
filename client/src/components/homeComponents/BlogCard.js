

// // import React from "react";

// // function BlogCard({ blog }) {

// //   // 🛡️ Safety check
// //   if (!blog) return null;

// //   return (
// //     <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition">

// //       {/* IMAGE */}
// //       {blog?.image && (
// //         <img
// //           src={blog.image}
// //           alt={blog.title}
// //           className="w-full h-56 object-cover"
// //         />
// //       )}

// //       <div className="p-5">

// //         {/* CATEGORY */}
// //         <p className="text-sm text-gray-500 mb-2">
// //           {blog?.category}
// //         </p>

// //         {/* TITLE */}
// //         <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-snug">
// //           {blog?.title}
// //         </h2>

// //         {/* SUMMARY */}
// //         <p className="text-gray-600 text-sm md:text-base mb-4">
// //           {blog?.summary}
// //         </p>

// //         {/* READ MORE */}
// //         <div className="flex justify-end">
// //           <button className="text-green-600 text-sm font-medium hover:underline">
// //             Read more
// //           </button>
// //         </div>

// //       </div>

// //     </div>
// //   );
// // }

// // export default BlogCard;

// // Home.jsx
// import React from "react";
// import BlogCard from "./BlogCard";
// import { useBlog } from "../../Context/BlogContext";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const { blogs } = useBlog(); // assuming your BlogContext provides all blogs
//   const navigate = useNavigate();

//   if (!blogs || blogs.length === 0) {
//     return <p className="text-center mt-10 text-gray-500">No blogs available.</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {blogs.map((blog) => (
//           <div
//             key={blog.id}
//             onClick={() => navigate(`/blog/${blog.slug || blog.id}`)}
//             className="cursor-pointer"
//           >
//             <BlogCard blog={blog} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Home.jsx
import React from "react";
import BlogCard from "./BlogCard";
import { useBlog } from "../../Context/BlogContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogs } = useBlog();
  const navigate = useNavigate();

  if (!blogs || blogs.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No blogs available.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => {
          // Map your blog data to the BlogCard props
          const cardData = {
            title: blog.title,
            category: blog.category,
            summary: blog.metaDescription || "No summary available.",
            image: blog.featuredImage || blog.heroImage || null, // ✅ correct field
          };

          return (
            <div
              key={blog.id}
              onClick={() => navigate(`/blog/${blog.slug || blog.id}`)}
              className="cursor-pointer"
            >
              <BlogCard blog={cardData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}